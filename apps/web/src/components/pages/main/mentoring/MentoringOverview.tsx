import CustomReviewerItem from '@repo/ui/components/ui/custom/CustomReviewerItem';
import CustomSessionInfoTags from '@repo/ui/components/ui/custom/CustomSessionInfoTags';
import Image from 'next/image';
import { MentoringDataType } from '../../../types/mentoring/mentoringTypes';
export default async function MentoringOverview({
  MentoringInfoData,
}: {
  MentoringInfoData: MentoringDataType;
}) {
  const initialUserData = [
    {
      userUuid: '389d459sssc8f21',
      menteeImageUrl: 'https://picsum.photos/200/200?random=14',
    },
    {
      userUuid: '389d45sd9c8f21',
      menteeImageUrl: 'https://picsum.photos/200/200?random=23',
    },
    {
      userUuid: '389d459c8f21',
      menteeImageUrl: 'https://picsum.photos/200/200?random=56',
    },
    {
      userUuid: '389d459dsc8f21',
      menteeImageUrl: 'https://picsum.photos/200/200?random=78',
    },
  ];
  return (
    <div>
      <CustomSessionInfoTags />
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5 pb-3 pt-5">
        <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold leading-tight">
          {MentoringInfoData?.name}
        </h2>
        <CustomReviewerItem
          initialUserData={initialUserData}
          className="hidden lg:!flex"
          userCount={30}
          reviewCount={293938}
        />
      </div>
      <div className="relative w-full h-[400px] p-5 mt-8 rounded-xl object-cover overflow-hidden bg-gray-200">
        {MentoringInfoData.categoryList && (
          <ul className="flex gap-3 absolute top-5 left-5">
            {MentoringInfoData?.categoryList[0]?.topCategoryName && (
              <li className="bg-adaptorsYellow/70 py-1 px-3 rounded-2xl ring-2 ring-white">
                {MentoringInfoData?.categoryList[0].topCategoryName}
              </li>
            )}
            {MentoringInfoData?.categoryList[0]?.middleCategoryName && (
              <li className="bg-adaptorsYellow/70 py-1 px-3 rounded-2xl ring-2 ring-white">
                {MentoringInfoData?.categoryList[0].middleCategoryName}
              </li>
            )}
            {MentoringInfoData?.categoryList[0]?.bottomCategoryName && (
              <li className="bg-adaptorsYellow/70 py-1 px-3 rounded-2xl ring-2 ring-white">
                {MentoringInfoData?.categoryList[0].bottomCategoryName}
              </li>
            )}
          </ul>
        )}
        <Image
          src={`${MentoringInfoData?.thumbnailUrl}`}
          alt="Profile"
          layout="fill" // 부모 크기에 맞게 조정
          objectFit="contain" // 높이 맞추고 원본 비율 유지
          priority
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <ul className="flex gap-3 py-3">
          <li className="bg-adaptorsBlue py-2 px-3 rounded-2xl text-white text-md ">
            #해시태그1
          </li>
          <li className="bg-adaptorsBlue py-2 px-3 rounded-2xl text-white text-md">
            #해시태그2
          </li>
          <li className="bg-adaptorsBlue py-2 px-3 rounded-2xl text-white text-md">
            #해시태그32398
          </li>
        </ul>
      </div>
      <div className="py-4 px-6 leading-relaxed">
        {MentoringInfoData.detail}
      </div>
    </div>
  );
}
