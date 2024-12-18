import React from 'react';
import { format, parseISO } from 'date-fns';
import { MentoringSessionContent } from '../../types/mentoring/mentoringTypes';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusConfig: {
    [key: string]: { label: string; color: string };
  } = {
    PENDING: { label: '대기 중', color: 'bg-yellow-100 text-yellow-800' },
    ONGOING: { label: '진행 중', color: 'bg-green-100 text-green-800' },
    COMPLETED: { label: '완료', color: 'bg-blue-100 text-blue-800' },
    CANCELLED: { label: '취소됨', color: 'bg-red-100 text-red-800' },
  };

  const { label, color } = statusConfig[status] || {
    label: status,
    color: 'bg-gray-100 text-gray-800',
  };

  return (
    <Badge
      variant="outline"
      className={`${color} border-0 px-2 py-1 text-nowrap ml-4 sm:px-4 sm:py-2 text-xs sm:text-sm`}
    >
      {label}
    </Badge>
  );
};

export default function MentoringCard({
  item,
}: {
  item: MentoringSessionContent;
}) {
  const formatTime = (time: { hour?: number; minute?: number }) => {
    const hour = time?.hour ?? 0; // hour가 undefined일 경우 0으로 기본값 설정
    const minute = time?.minute ?? 0; // minute이 undefined일 경우 0으로 기본값 설정
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">
            {item.mentoringName}
          </CardTitle>
          <StatusBadge status={item.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span>
            {format(parseISO(item.startDate), 'yyyy년 MM월 dd일')} -{' '}
            {format(parseISO(item.endDate), 'yyyy년 MM월 dd일')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span>
            {item.startTime && formatTime(item.startTime)} -{' '}
            {item.endTime && formatTime(item.endTime)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-500" />
          <span>
            현재 {item.nowHeadCount}명 (최소 {item.minHeadCount}명 ~ 최대{' '}
            {item.maxHeadCount}명)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-gray-500" />
          <span>
            {item.price.toLocaleString('ko-kr')}{' '}
            <span className="ml-1">Volt</span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          최종 수정: {format(parseISO(item.updatedAt), 'yyyy-MM-dd HH:mm')}
        </div>
      </CardFooter>
    </Card>
  );
}
