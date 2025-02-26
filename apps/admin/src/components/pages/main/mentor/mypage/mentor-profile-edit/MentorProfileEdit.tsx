'use client';

import { useState } from 'react';
import { Mentor } from '@repo/admin/components/types/main/mentor/mentorTypes';
import SubmitButton from '@repo/admin/components/ui/Button/SubmitButton';
import MentorProfileEditForm from '@repo/admin/components/form/MentorProfileEditForm';
import { MentorProfileEditFormType } from '@repo/admin/components/types/main/mypage/myPageTypes';
import { PutUserTotalInfo } from '@repo/admin/actions/mypage/mypageAction';

interface MentorProfileEditProps {
  mentor: Mentor;
  onUpdate: (updatedMentor: Mentor) => void;
}

export default function MentorProfileEdit({
  mentor,
  onUpdate,
}: MentorProfileEditProps) {
  const [formData, setFormData] = useState<MentorProfileEditFormType>({
    profileImageUrl: mentor.profileImageUrl ? mentor.profileImageUrl : '',
    nickName: mentor.memberRequestDto.nickName
      ? mentor.memberRequestDto.nickName
      : '',
    phoneNumber: mentor.memberRequestDto.phoneNumber
      ? mentor.memberRequestDto.phoneNumber
      : '',
    mentoringField: mentor.mentorProfileRequestDto
      ? mentor.mentorProfileRequestDto.mentoringField
      : '',
    age: mentor.mentorProfileRequestDto
      ? mentor.mentorProfileRequestDto.age
      : 0,
    gender: mentor.mentorProfileRequestDto
      ? mentor.mentorProfileRequestDto.gender
      : '',
    jobExperience: mentor.mentorProfileRequestDto
      ? mentor.mentorProfileRequestDto.jobExperience
      : '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await PutUserTotalInfo({ formData, imageFile: file });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-auto max-w-3xl">
      <MentorProfileEditForm
        formData={formData}
        file={file}
        setFile={setFile}
        setFormData={setFormData}
      />
      <SubmitButton title="Update Profile" />
    </form>
  );
}
