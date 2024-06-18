
import { Bars } from 'react-loader-spinner'

function Loading() {
  return (
    <div className=" min-h-80 flex justify-center items-center">
     
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      
    </div>
  );
}

export default Loading;
