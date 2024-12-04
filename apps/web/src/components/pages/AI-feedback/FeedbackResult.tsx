import Smile from '@components/assets/icons/Smile';
import Terrified from '@components/assets/icons/Terrified';
import { CommonLayout } from '@components/common/commomLayout';
import { Badge } from '@repo/ui/components/ui/badge';
import BadgeAndFeedback from './BadgeAndFeedback';
const good = `1. 문장 구성과 가독성 전체적인 문장이 길어지는 경향이 있습니다. 문장을
  짧고 간결하게 작성하면 가독성이 높아지고, 메시지를 효과적으로 전달할
  수 있습니다. 예를 들어, "저는 어렸을 때부터 컴퓨터에 관심이 많았으며,
  대학에서는 전공 수업과 외부 활동을 통해 더욱 깊이 있는 학습을
  이어갔습니다"를 "어릴 적부터 컴퓨터에 관심이 많아, 대학에서 전공과
  외부 활동으로 심화 학습을 했습니다"처럼 다듬을 수 있습니다. 접속사와
  문장 간 연결을 과도하게 사용하면 독자가 문맥을 이해하기 어려울 수
  있으므로 주의가 필요합니다. 간단한 문장으로 메시지를 나누는 연습을
  추천합니다.
  \n 2. 강점의 구체화 작성하신 자기소개서에서 본인의 강점과
  성격적 장점을 잘 드러내고 있습니다. 다만, 이를 구체적인 사례나 경험과
  연결한다면 더 설득력 있는 글이 될 것입니다. 예를 들어, "책임감이
  강하다"는 단순한 서술보다는 "졸업 프로젝트를 진행하며 팀원 간 역할을
  조율하고 최종 보고서를 정리한 경험을 통해 책임감을 인정받았다"처럼
  사례를 통해 보여주세요. 특히, 본인이 해결한 문제나 기여한 성과를
  구체적으로 숫자나 결과로 보여주면 읽는 사람이 더욱 신뢰감을 느낄 수
  있습니다.`;
const bad = `1. 문장 구성과 가독성 전체적인 문장이 길어지는 경향이 있습니다. 문장을
  짧고 간결하게 작성하면 가독성이 높아지고, 메시지를 효과적으로 전달할수 있습니다. 예를 들어, "저는 어렸을 때부터 컴퓨터에 관심이 많았으며,
          대학에서는 전공 수업과 외부 활동을 통해 더욱 깊이 있는 학습을
          이어갔습니다"를 "어릴 적부터 컴퓨터에 관심이 많아, 대학에서 전공과
          외부 활동으로 심화 학습을 했습니다"처럼 다듬을 수 있습니다. 접속사와
          문장 간 연결을 과도하게 사용하면 독자가 문맥을 이해하기 어려울 수
          있으므로 주의가 필요합니다. 간단한 문장으로 메시지를 나누는 연습을
          추천합니다. 2. 강점의 구체화 작성하신 자기소개서에서 본인의 강점과
          성격적 장점을 잘 드러내고 있습니다. 다만, 이를 구체적인 사례나 경험과
          연결한다면 더 설득력 있는 글이 될 것입니다. 예를 들어, "책임감이
          강하다"는 단순한 서술보다는 "졸업 프로젝트를 진행하며 팀원 간 역할을
          조율하고 최종 보고서를 정리한 경험을 통해 책임감을 인정받았다"처럼
          사례를 통해 보여주세요. 특히, 본인이 해결한 문제나 기여한 성과를
          구체적으로 숫자나 결과로 보여주면 읽는 사람이 더욱 신뢰감을 느낄 수
          있습니다.`;
export default function FeedbackResult() {
  return (
    <CommonLayout type="section" className="w-full flex-1 xl:flex gap-5 mb-10">
      <BadgeAndFeedback feedbackText={good}>
        <Badge className="bg-adaptorsBlue/30 px-4 text-lg hover:bg-adaptorsBlue/30">
          <Smile className="mr-2" color="#0060FF" /> 잘 작성했어요
        </Badge>
      </BadgeAndFeedback>
      <BadgeAndFeedback feedbackText={bad}>
        <Badge className="bg-[#ff3f3f]/30 px-4 text-lg hover:bg-[#ff3f3f]/30">
          <Terrified className="mr-2" color="#ff3f3f" />
          보완이 필요해요
        </Badge>
      </BadgeAndFeedback>
    </CommonLayout>
  );
}
