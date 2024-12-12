import { SeparateContainer } from '@repo/ui/components/ui/custom/CustomSeparateContainer';
import {
  MentoringDataType,
  MentoringResult,
} from '@repo/ui/types/CommonType.ts';
import { ReviewDto, ReviewerProfileType } from '@repo/ui/types/ReviewType.js';
import { CommonLayout } from '@repo/web/components/common/commomLayout';
import { userProfileType } from '@repo/web/components/types/profile/RequestType';
import ChevronText from '@repo/web/components/ui/Text/ChevronText';
import MentoringContents from './MentoringContents';
import MentoringOverview from './MentoringOverview';
import MentorSection from './MentorSection';
import MentoringReview from './review/MentoringReview';
import SessionList from './SessionList';
export default function MentoringDetail({
  mentoringDate,
  mentoringUuid,
  mentoringSessionList,
  MentoringInfoData,
  mentorData,
  ReviewerData,
  bestRevieweList,
}: {
  mentoringDate: string;
  mentoringUuid: string;
  mentoringSessionList: MentoringResult[];
  MentoringInfoData: MentoringDataType;
  mentorData: userProfileType;
  ReviewerData: ReviewerProfileType[];
  bestRevieweList: ReviewDto[];
}) {
  const userData: ReviewerProfileType[] = [
    {
      nickname: '389d459sssc8f21',
      userImageUrl: 'https://picsum.photos/200/200?random=14',
    },
    {
      nickname: '389d45sd9c8f21',
      userImageUrl: 'https://picsum.photos/200/200?random=23',
    },
    {
      nickname: '389d459c8f21',
      userImageUrl: 'https://picsum.photos/200/200?random=56',
    },
    {
      nickname: '389d459dsc8f21',
      userImageUrl: 'https://picsum.photos/200/200?random=78',
    },
  ];
  const filteredList: MentoringResult[] = mentoringDate
    ? mentoringSessionList.filter((item) => item.startDate === mentoringDate)
    : mentoringSessionList;
  return (
    <CommonLayout
      reative="container"
      className=" mx-auto sm:flex gap-10 my-4 px-1 sm:px-4 md:px-8 xl:max-w-[1140px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[90%] relative"
    >
      {/* Left Section */}
      <MentorSection
        mentorUuid={MentoringInfoData?.mentorUuid || ''}
        mentoringSessionList={mentoringSessionList}
        mentorData={mentorData}
        ReviewerData={ReviewerData[0]?.userImageUrl ? ReviewerData : userData}
      />
      {/* Ri Section */}
      <SeparateContainer.RightSide>
        {MentoringInfoData && (
          <MentoringOverview
            MentoringInfoData={MentoringInfoData}
            userData={ReviewerData[0]?.userImageUrl ? ReviewerData : userData}
          />
        )}
        <ChevronText text="멘토링 안내" className="pt-6" />
        <MentoringContents content={MentoringInfoData.detail} />
        <ChevronText text="멘토링 세션" className="pb-4" />
        <SessionList
          filteredList={filteredList}
          MentoringData={MentoringInfoData}
        />
        <ChevronText text="리뷰" className="py-3" />
        <MentoringReview bestRevieweList={bestRevieweList} />
      </SeparateContainer.RightSide>
    </CommonLayout>
  );
}
