import React, { useState, useEffect } from 'react'
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
    const { axios } = useAppContext();
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState('Not Approved');

    const fetchComments = async () => {
        try {
            const { data } = await axios.get('/api/admin/comments');
            console.log(data);
            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [])

    return (

        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
            <div className='flex justify-between items-center max-w-3xl'>
                <h1>All comments</h1>
                <div className='flex gap-4'>
                    <button onClick={() => setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'}`}>Approved</button>

                    <button onClick={() => setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'}`}>Not Approved</button>

                </div>
            </div>
            <div className='relative h-4/5 max-w-3xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase text-left bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
                            <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
                            <th scope='col' className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.filter((comment) => {
                            if (filter === 'Approved') {
                                return comment.isApproved === true;
                            } else if (filter === 'Not Approved') {
                                return comment.isApproved === false;
                            }
                        }).map((comment, index) => {
                            return <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComment={fetchComments} />
                        })}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Comments