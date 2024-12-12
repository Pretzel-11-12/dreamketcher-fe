type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex items-center justify-center w-full h-[130px] bg-[#444655] text-white text-[14px] mt-auto">
      {/* <div className="w-[1024px] mb-[-15px]">
        <div className="flex flex-row start-1 gap-1 my-[-2px]">
          <img
            src={`/assets/images/team-logo.png`}
            alt="Team Logo"
            className="h-8 w-8 relative top-[-5px]"
          />
          <p>Pretzel</p>
        </div>
        <div className="flex flex-row start-1 gap-3 my-[-2px]">
          <img
            src={`/assets/images/email.png`}
            alt="Team Email"
            className="h-5 w-5 relative top-[-2px] left-[5px] mr-[4px]"
          />
          <p>pretzelll9999@gmail.com</p>
        </div>
        <div className="flex flex-row start-1 gap-3 my-[10px]">
          <img
            src={`/assets/images/tool.png`}
            alt="Team Info"
            className="h-5 w-5 relative top-[-2px] left-[5px] mr-[4px]"
          />
          <p>andy</p>
        </div>
      </div> */}
      <p>푸터 영역</p>
    </div>
  );
};

export default Footer;
