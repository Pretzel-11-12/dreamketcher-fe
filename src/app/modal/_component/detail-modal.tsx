import Image from 'next/image';

function FavoriteModal() {
  return (
    <div className="absolute top-0 left-0 translate-x-[calc(-50%+7px)] translate-y-[calc(-50%-26px)] w-[278px] h-[54px]">
      <Image
        src="/assets/images/modal/favorite-modal-bg.png"
        alt="favorite-modal-bg"
        fill
      />
    </div>
  );
}

function ViewModal() {
  return (
    <div className="absolute top-0 left-0 translate-x-[calc(-50%+7px)] translate-y-[calc(-50%-26px)] w-[349px] h-[54px]">
      <Image
        src="/assets/images/modal/view-modal-bg.png"
        alt="view-modal-bg"
        fill
      />
    </div>
  );
}

function CommentModal() {
  return (
    <div className="absolute top-0 left-0 translate-x-[calc(-50%+7px)] translate-y-[calc(-50%-26px)] w-[348px] h-[54px]">
      <Image
        src="/assets/images/modal/comment-modal-bg.png"
        alt="comment-modal-bg"
        fill
      />
    </div>
  );
}

export { FavoriteModal, ViewModal, CommentModal };
