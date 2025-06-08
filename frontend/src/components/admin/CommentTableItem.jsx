import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComment }) => {
    const { axios } = useAppContext();
    const { blog, createdAt, _id } = comment;
    const blogDate = new Date(createdAt).toDateString();

    const handleDelete = async () => {

        try {
            const { data } = await axios.delete('/api/admin/delete-comment', {
                data: { commentId: _id } // Send data in the `data` field
            });
            if (data.success) {
                toast.success(data.message);
                fetchComment();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleApprove = async () => {
        try {
            const { data } = await axios.put('/api/admin/approve-comment', { commentId: _id });
            if (data.success) {
                toast.success(data.message);
                fetchComment();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            fetchComment();
        }
    }

    return (
        <tr className='order-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>Blog </b> : {comment.blogId.title}
                <br />
                <br />
                <b className='font-medium text-gray-600'>Name </b> : {comment.name}
                <br />
                <b className='font-medium text-gray-600'>Comment </b> : {comment.content}
            </td>

            <td className='px-6 py-4 max-sm:hidden'>
                {blogDate}
            </td>

            <td className='px-6 py-4'>
                <div className='inline-flex items-center gap-4'>
                    {!comment.isApproved ? <img src={assets.tick_icon} className='w-5 hover:scale-110 cursor-pointer transition-all' onClick={handleApprove} /> : <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}
                    <img src={assets.bin_icon} alt="" className='w-5 hover:scale-110 cursor-pointer transition-all' onClick={handleDelete} />
                </div>
            </td>

        </tr>
    )
}

export default CommentTableItem