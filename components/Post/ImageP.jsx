import React from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

const ImageP = ({ posts }) => {
  return (
    <div className='relative rounded-xl flex justify-center items-center overflow-hidden'>
      <img
        className='w-full h-full object-cover rounded-xl'
        src={posts.file?.link}
      />
    </div>
  );
};

export default ImageP;
