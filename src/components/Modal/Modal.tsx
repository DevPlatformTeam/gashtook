"use client";

import { useLocale } from "next-intl";
import Button from "../Button/Button";
import { IoClose } from "react-icons/io5";
import { Fragment, ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface IModalProps {
  title: string;
  body: ReactNode;
  footerBtn: string;
  isOpen: boolean;
  onClose: () => void;
  onFooterAction?: () => Promise<void> | void;
  showFooterBtn?: boolean;
}

export default function Modal({
  title,
  body,
  footerBtn,
  isOpen,
  onClose,
  onFooterAction,
  showFooterBtn = true,
}: IModalProps) {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const handleFooterClick = async () => {
    if (onFooterAction) {
      setLoading(true);
      try {
        await onFooterAction();
      } catch (error) {
        console.error("Error in footer action:", error);
      } finally {
        setLoading(false);
        // onClose();
      }
    } else {
      // onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-0 md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-md h-screen md:h-auto relative transform overflow-hidden rounded-0 md:rounded-2xl bg-white p-6 ${locale === "fa" ? "text-right" : "text-left"} shadow-xl transition-all`}
              >
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <Dialog.Title className="text-[20px] font-medium text-gray-700">
                    {title}
                  </Dialog.Title>
                  <button onClick={onClose}>
                    <IoClose size={32} />
                  </button>
                </div>

                <div className="mt-4">{body}</div>
                {showFooterBtn && (
                  <>
                    <div className="mt-4 hidden md:block">
                      <Button
                        className="mx-auto"
                        text={footerBtn}
                        loading={loading}
                        onClick={handleFooterClick}
                        disabled={loading}
                      />
                    </div>
                    <div className="w-screen block absolute bottom-0 left-0 md:hidden">
                      <Button
                        className="mx-auto w-full py-5 text-2xl !rounded-none"
                        text={footerBtn}
                        loading={loading}
                        onClick={handleFooterClick}
                        disabled={loading}
                      />
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
