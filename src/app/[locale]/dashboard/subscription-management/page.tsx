import Button from '@/components/Button/Button';
import React from 'react'
import { PiBriefcaseLight } from 'react-icons/pi';

interface Subscription {
  type: string;
  price: string;
  orderNumber: string;
  status: boolean;
  Referencecode: string;
}

export default function Page() {
  const data: Subscription[] = [
    {
      type: "اشتراک سالانه",
      price: "100,000 تومان",
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: "اشتراک روزانه",
      price: "3,000 تومان",
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
    {
      type: "اشتراک روزانه",
      price: "3,000 تومان",
      orderNumber: "159",
      status: false,
      Referencecode: "1234567890",
    },
    {
      type: "اشتراک روزانه",
      price: "3,000 تومان",
      orderNumber: "159",
      status: false,
      Referencecode: "1234567890",
    },
    {
      type: "اشتراک روزانه",
      price: "3,000 تومان",
      orderNumber: "159",
      status: true,
      Referencecode: "1234567890",
    },
  ];
  return (
    <div className="h-full text-right">
      <h1 className="text-xl font-bold pb-2 mx-4 border-b border-gray-200">مدیریت اشتراک</h1>
      {data.length > 0 ? <table className="flex flex-col w-full h-full px-4 overflow-y-auto scroll pt-4">
        <thead className='w-full flex justify-between items-center child:w-1/5 child:text-gray-400 pb-4 child:text-right border-b border-gray-100'>
          <th>
            <span>نوع اشتراک</span>
          </th>
          <th>
            <span>قیمت</span>
          </th>
          <th>
            <span>شماره سفارش</span>
          </th>
          <th>
            <span>وضعیت</span>
          </th>
          <th>
            <span>کد مرجع</span>
          </th>
        </thead>
        <tbody className='w-full flex flex-col gap-3 divide-y divide-gray-100 child:pt-3'>
          {data.map((card, index) => (
            <tr key={index} className='w-full flex justify-between items-center child:w-1/4 child:text-secondary'>
              <td>{card.type}</td>
              <td>{card.price}</td>
              <td>{card.orderNumber}</td>
              <td>{card.status ? <span className='text-primary'>فعال</span> : <span className='text-red-400'>غیرفعال</span>}</td>
              <td>{card.Referencecode}</td>
            </tr>
          ))}
        </tbody>
      </table> :
        <div className={"w-full h-full flex-center flex-col"}>
          <PiBriefcaseLight className="size-20 text-gray-500" />
          <p className="text-center text-gray-500">شما تاکنون اشتراکی خریداری نکرده اید</p>
          <Button text="خرید اشتراک" color='primary' textColor='background' className='font-normal mt-8 px-8' />
        </div>
      }
    </div>
  );
}
