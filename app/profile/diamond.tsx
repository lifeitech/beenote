'use client';
import getclient from '@utils/pb-client'
import Swal from 'sweetalert2'

export default function Diamond() {
    const pb = getclient();
    const diamonds = pb.authStore.model.point;
    const handleClick = () => {
        Swal.fire('Under Construction! \n 敬请期待！')
    }

    return (
        <div className='flex flex-col gap-7'>
        <div>
            The amount of diamonds you have is {diamonds}.
        </div>
        <button onClick={handleClick} className='btn'>Charge</button>
        </div>
    )
}