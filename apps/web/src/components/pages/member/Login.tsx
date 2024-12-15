import AdaptorsLogoIcon from '@repo/web/components/assets/icons/AdaptorsLogo';
import LoginForm from '../../form/LoginForm';
import PolicyLinks from './PolicyLinks';
import Separator from './Separator';
import SignInTitle from './SignInTitle';
import SocialLogin from './SocialLogin';

export default function Login({ id, pw }: { id?: string; pw?: string }) {
  return (
    <div className="space-y-4 flex flex-col justify-center mt-5">
      <AdaptorsLogoIcon className="w-[50%] mb-3 lg:!hidden" />
      <SignInTitle title="SIGN IN" />
      <LoginForm id={id} pw={pw} />
      <Separator />
      <SocialLogin />
      <PolicyLinks />
    </div>
  );
}
