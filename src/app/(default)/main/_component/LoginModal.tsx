import Modal from '@/app/_component/Modal';
import { useRouter } from 'next/navigation';
interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

export default function LoginModal({
  isLoginModalOpen,
  setIsLoginModalOpen,
}: LoginModalProps) {
  const router = useRouter();
  return (
    <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
      <div className="bg-white rounded-lg w-[384px] flex flex-col items-center shadow-lg">
        <p className="text-[20px] text-[#282828] p-[30px] text-center leading-[28px]">
          드림케쳐에 로그인 또는 회원가입을 해서
          <br /> 더 많은 기능을 사용해보세요!
        </p>
        <div className="flex flex-col gap-2 w-full px-[15px] pb-[15px]">
          <button
            className="bg-brand-yellow text-white w-full h-[50px] rounded-md font-medium"
            onClick={() => {
              setIsLoginModalOpen(false);
              router.push('/login');
            }}
          >
            로그인 또는 회원가입
          </button>
          <button
            className="bg-gray-200 text-gray-700 w-full h-[50px] rounded-md font-medium"
            onClick={() => setIsLoginModalOpen(false)}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
