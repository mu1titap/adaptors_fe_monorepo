'use client';
import React, { useState } from 'react';
import { postLogin } from '../../actions/auth/auth';
import JoinInput from '../ui/input/JoinInput';

export default function LoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null); // 에러 메시지 상태
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const clearId = () => setId('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = {
      accountId: id,
      password: pw,
    };

    try {
      const result = await postLogin(requestBody);
      if (!result.result) {
        setLoginError('아이디 혹은 비밀번호가 일치하지 않습니다.');
      } else {
        setLoginError(null);
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
      setLoginError('로그인 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <form className="max-w-[400px] mx-auto " onSubmit={handleSubmit}>
      <JoinInput
        signInInput={{
          text: '아이디',
          value: id,
          name: 'id',
          setValue: setId,
          clearValue: clearId,
        }}
      />
      <JoinInput
        signInInput={{
          text: '비밀번호',
          value: pw,
          name: 'pw',
          setValue: setPw,
          clearValue: clearId,
        }}
      />
      {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

      <button
        type="submit"
        className="w-full my-6 bg-zinc-700 h-14 text-white rounded-lg font-bold"
      >
        로그인하기
      </button>
    </form>
  );
}
