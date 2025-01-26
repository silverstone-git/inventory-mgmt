import React from "react";

const ModalBox = (props: {children: React.ReactNode, handleCancel: any}) => {


  const handleClose = () => {
    props.handleCancel();
  };

  return <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black/80">
      <div className="relative p-8 rounded-xl bg-white z-20" >

        <div className="absolute top-4 right-4 text-zinc-900 cursor-pointer hover:text-red-800" onClick={handleClose}>✘</div>
        {props.children}
      </div>
    </div>
}

export default ModalBox;
