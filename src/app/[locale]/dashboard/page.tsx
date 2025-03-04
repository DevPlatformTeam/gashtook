import React from 'react';
import { RxDashboard } from 'react-icons/rx';

export default function DashboardPage() {
  return (
    <div className="h-full text-right">
      <h1 className="hidden lg:block text-2xl px-4 font-bold mb-4">داشبورد</h1>
          <div className="h-full flex-center flex-col gap-4 text-gray-400">
            <RxDashboard className='text-[4rem]' />
            <h2 className='text-2xl font-bold'>به داشبورد کاربری خوش آمدید</h2>
      </div>
    </div>
  );
}
