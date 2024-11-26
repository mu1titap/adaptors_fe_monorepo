'use client';

import { useEffect, useState } from 'react';
import {
  LocalVideoTrack,
  Room,
  RoomEvent,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteParticipant,
} from 'livekit-client';
import Tracks from './Tracks';
import OpenMentoring from './openMentoring/OpenMentoring';
import MeetingHeader from './MeetingHeader';
import Participants from './participants/Participants';
import Chatting from '../../chatting/Chatting';
import { participantType } from '../../../../types/main/meeting/meetingTypes';
import {
  getParticipants,
  getToken,
} from '../../../../../actions/meeting/meetingAction';
import { getChatProfile } from '../../../../../actions/chatting/chattingAction';
import { useUserInfoStore } from '../../../../../store/messagesStore';

const LIVEKIT_URL =
  process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880/';

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

export default function Meeting() {
  const [room, setRoom] = useState<Room | null>(null);
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined
  );
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);
  const [participantName, setParticipantName] = useState(
    `Participant${Math.floor(Math.random() * 100)}`
  );
  const [roomName, setRoomName] = useState('Test Room');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [remoteMuteStatus, setRemoteMuteStatus] = useState<
    Record<string, { audio: boolean; video: boolean }>
  >({});
  const { userInfo, addUserInfo } = useUserInfoStore();
  const [participants, setParticipants] = useState<participantType[]>([]);

  const fetchParticipants = async (userUuid: string) => {
    const existingProfile = userInfo.find((user) => user.userUuid === userUuid);
    if (existingProfile) {
      setParticipants((prev) => [...prev, existingProfile]);
    } else {
      const participantsData = await getChatProfile({ userUuid: userUuid });
      console.log(participantsData);
      setParticipants((prev) => [
        ...prev,
        {
          userUuid: userUuid,
          nickname: participantsData.nickName,
          profileImageUrl: participantsData.profileImageUrl,
        },
      ]);
    }
  };

  useEffect(() => {
    const fetchParticipantsUuid = async () => {
      const participantsUuidData = await getParticipants(
        'ac419217-cb98-4334-8b78-8126aa0e57aa'
      );
      const fetchPromises = participantsUuidData.map((userUuid: string) =>
        fetchParticipants(userUuid)
      );

      await Promise.all(fetchPromises);
    };

    fetchParticipantsUuid();
  }, [room]);

  async function joinRoom() {
    const room = new Room();
    setRoom(room);

    room.on(
      RoomEvent.TrackSubscribed,
      (
        _track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
      ) => {
        setRemoteTracks((prev) => [
          ...prev,
          {
            trackPublication: publication,
            participantIdentity: participant.identity,
          },
        ]);
      }
    );

    room.on(
      RoomEvent.TrackUnsubscribed,
      (_track: RemoteTrack, publication: RemoteTrackPublication) => {
        setRemoteTracks((prev) =>
          prev.filter(
            (track) => track.trackPublication.trackSid !== publication.trackSid
          )
        );
      }
    );

    try {
      const token = await getToken(roomName, participantName);
      await room.connect(LIVEKIT_URL, token);
      await room.localParticipant.enableCameraAndMicrophone();
      const localVideoTrackPublication =
        room.localParticipant.videoTrackPublications.values().next().value;

      if (localVideoTrackPublication) {
        setLocalTrack(localVideoTrackPublication.videoTrack);
      }
    } catch (error) {
      console.log(
        'There was an error connecting to the room:',
        (error as Error).message
      );
      await leaveRoom();
    }
  }

  async function leaveRoom() {
    await room?.disconnect();
    setIsCameraOn(true);
    setIsMicOn(true);
    setRoom(null);
    setLocalTrack(undefined);
    setRemoteTracks([]);
  }

  async function toggleScreenSharing() {
    if (isScreenSharing) {
      await room?.localParticipant.setScreenShareEnabled(false);
      setIsScreenSharing(false);
    } else {
      await room?.localParticipant.setScreenShareEnabled(true);
      setIsScreenSharing(true);
    }
  }

  async function toggleMicrophone() {
    if (isMicOn) {
      await room?.localParticipant.setMicrophoneEnabled(false);
    } else {
      await room?.localParticipant.setMicrophoneEnabled(true);
    }
    setIsMicOn((prev) => !prev);
  }

  async function toggleCamera() {
    if (isCameraOn) {
      await room?.localParticipant.setCameraEnabled(false);
    } else {
      await room?.localParticipant.setCameraEnabled(true);
    }
    setIsCameraOn((prev) => !prev);
  }

  const toggleParticipantMicrophone = async (participantIdentity: string) => {
    const participant = room?.remoteParticipants.get(participantIdentity);
    if (participant) {
      const audioTrackPublication = participant.audioTrackPublications
        .values()
        .next().value;
      if (audioTrackPublication) {
        const isMuted = remoteMuteStatus[participantIdentity]?.audio; // 현재 음소거 상태 가져오기
        await audioTrackPublication.setEnabled(!isMuted); // 트랙 활성화/비활성화
        setRemoteMuteStatus((prev) => ({
          ...prev,
          [participantIdentity]: {
            ...prev[participantIdentity],
            audio: !isMuted, // 음소거 상태 업데이트
          },
        }));
        console.log(
          `${participantIdentity} microphone has been ${isMuted ? 'muted' : 'unmuted'}`
        );
      }
    }
  };

  const toggleParticipantCamera = async (participantIdentity: string) => {
    const participant = room?.remoteParticipants.get(participantIdentity);
    if (participant) {
      const videoTrackPublication = participant.videoTrackPublications
        .values()
        .next().value;
      if (videoTrackPublication) {
        const isMuted = remoteMuteStatus[participantIdentity]?.video; // 현재 음소거 상태 가져오기
        await videoTrackPublication.track?.setMuted(!isMuted); // 트랙 활성화/비활성화
        setRemoteMuteStatus((prev) => ({
          ...prev,
          [participantIdentity]: {
            ...prev[participantIdentity],
            video: !isMuted, // 비디오 음소거 상태 업데이트
          },
        }));
        console.log(
          `${participantIdentity} video has been ${isMuted ? 'muted' : 'unmuted'}`
        );
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!room ? (
        <OpenMentoring
          joinRoom={joinRoom}
          participantName={participantName}
          setParticipantName={setParticipantName}
          roomName={roomName}
          setRoomName={setRoomName}
        />
      ) : (
        <>
          <MeetingHeader participants={participants} />
          <div className="grid grid-cols-7 h-[90vh]">
            <div className="col-span-5 bg-[#FAFAFE]">
              <Tracks
                roomName={roomName}
                leaveRoom={leaveRoom}
                toggleScreenSharing={toggleScreenSharing}
                isScreenSharing={isScreenSharing}
                isCameraOn={isCameraOn}
                toggleCamera={toggleCamera}
                toggleMicrophone={toggleMicrophone}
                isMicrophoneOn={isMicOn}
                localTrack={localTrack}
                participantName={participantName}
                remoteTracks={remoteTracks}
              />
            </div>
            <div className="flex flex-col col-span-2 h-full">
              <div className="h-[36vh]">
                <Participants
                  participants={participants}
                  toggleParticipantMicrophone={toggleParticipantMicrophone}
                  toggleParticipantCamera={toggleParticipantCamera}
                />
              </div>
              <div className="h-[54vh]">
                <Chatting />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
