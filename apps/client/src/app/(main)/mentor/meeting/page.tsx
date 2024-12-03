import Meeting from '@repo/client/components/pages/main/mentor/meeting/Meeting';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Mentoring Meeting`,
};

const mentoringSessionList = [
  {
    mentoringName: '프로그래밍 기초 멘토링',
    sessionUuid: '123',
    startDate: '2024-12-02',
    endDate: '2024-12-02',
    startTime: {
      hour: 9,
      minute: 0,
      second: 0,
      nano: 0,
    },
    endTime: {
      hour: 18,
      minute: 0,
      second: 0,
      nano: 0,
    },
  },
];

export default async function Page() {
  return (
    <main className="container mx-auto p-4">
      <Meeting mentoringSessionList={mentoringSessionList} />
    </main>
  );
}
