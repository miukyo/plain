import React from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import moment from "moment";

const Comment = ({ posts }) => {
  const { data: session } = useSession();
  const [commentUp, setCommentUp] = React.useState({
    text: "",
    update: 0,
  });
  const sendComment = async () => {
    if (commentUp.text.length > 0) {
      await axios({
        method: "post",
        url: `/api/post/${posts.id}/comment`,
        data: {
          session: session?.userId,
          text: commentUp.text,
        },
      });
      setCommentUp({
        ...commentUp,
        update: commentUp.update + 1,
        text: "",
      });
    }
  };
  const [comments, setComments] = React.useState([]);
  const [reply, setReply] = React.useState({
    text: "",
    id: "",
    show: false,
  });
  React.useEffect(async () => {
    const { data } = await axios({
      method: "get",
      url: `/api/post/${posts.id}/comment`,
    });
    setComments(data);
  }, [commentUp.update]);
  const sendReply = async () => {
    if (reply.text.length > 0) {
      await axios({
        method: "post",
        url: `/api/post/${posts.id}/reply`,
        data: {
          id: reply.id,
          session: session?.userId,
          text: reply.text,
        },
      });
      setCommentUp({ ...commentUp, update: commentUp.update + 1 });
      setReply({ ...reply, text: "", length: 0 });
    }
  };
  return (
    <div className='w-full relative'>
      <div className='flex pt-5'>
        <div className='w-full relative border rounded-2xl py-10 px-14 shrink-0 dark:bg-gray-800 dark:border-gray-700'>
          {session ? (
            <div className='flex flex-col gap-3 items-end w-full'>
              <div className='flex gap-3 w-full'>
                <img
                  className='rounded-full object-cover h-[40px] w-[40px] select-none dark:ring-offset-gray-800'
                  style={{ fontSize: "0" }}
                  src={session?.user.image}
                  alt='Profile Picture'></img>
                <TextareaAutosize
                  className='relative overflow-hidden resize-none bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:outline-none focus:border-purp w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-purp'
                  placeholder="What's on your mind?"
                  value={commentUp.text}
                  onChange={(e) => {
                    setCommentUp({
                      ...commentUp,
                      text: e.target.value,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13 && !e.shiftKey) {
                      e.preventDefault();
                      sendComment();
                      return false;
                    }
                  }}
                  maxLength={1000}
                  minRows={1}
                  required
                />
              </div>
            </div>
          ) : (
            <div className='text-center'>
              <span onClick={signIn} className='text-purp cursor-pointer'>
                Login
              </span>{" "}
              or{" "}
              <span onClick={signIn} className='text-purp cursor-pointer'>
                Sign up
              </span>{" "}
              to join the conversation
            </div>
          )}
          <hr className='w-[50%] mx-auto bg-black dark:bg-white opacity-20 h-[2px] rounded my-5' />
          <div className='flex flex-col gap-3'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex gap-3'>
                <img
                  className='rounded-full object-cover h-[40px] w-[40px] select-none dark:ring-offset-gray-800'
                  style={{ fontSize: "0" }}
                  src={comment.author?.image}
                  alt='Profile Picture'></img>
                <div className='flex flex-col gap-1 w-full'>
                  <div className='w-fit rounded-xl py-2 px-4 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                    <p className='text-sm font-bold dark:text-white mb-1'>
                      {comment.author.name}
                    </p>
                    <p className='text-sm'>{comment.text}</p>
                  </div>
                  <div className='font-light flex gap-1 text-xs dark:text-gray-400'>
                    <p
                      onClick={() =>
                        setReply({
                          ...reply,
                          id: comment.id,
                          show: true,
                        })
                      }
                      className={`${
                        reply.show &&
                        reply.id == comment.id &&
                        "text-purp pointer-events-none"
                      } hover:text-purp cursor-pointer mb-2`}>
                      Reply
                    </p>
                    <p>• {moment(comment.createdAt).fromNow()}</p>
                  </div>
                  {comment.reply.map((reply) => (
                    <div key={reply.id} className='flex gap-3'>
                      <img
                        className='rounded-full object-cover h-[40px] w-[40px] select-none dark:ring-offset-gray-800'
                        style={{ fontSize: "0" }}
                        src={reply.authorImage}
                        alt='Profile Picture'></img>
                      <div className='flex flex-col gap-1 w-full'>
                        <div className='w-fit rounded-xl py-2 px-4 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                          <p className='text-sm font-bold dark:text-white mb-1'>
                            {reply.authorName}
                          </p>
                          <p className='text-sm'>{reply.text}</p>
                        </div>
                        <div className='font-light flex gap-1 text-xs dark:text-gray-400'>
                          <p>{moment(reply.createdAt).fromNow()}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {reply.show && reply.id == comment.id && (
                    <div className='flex flex-col gap-3 items-end w-full'>
                      <div className='flex gap-3 w-full relative'>
                        <img
                          className='rounded-full object-cover h-[35px] w-[35px] select-none dark:ring-offset-gray-800'
                          style={{ fontSize: "0" }}
                          src={session?.user.image}
                          alt='Profile Picture'></img>
                        <TextareaAutosize
                          className='relative overflow-hidden resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-purp w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-purp'
                          placeholder='Send reply'
                          value={reply.text}
                          onChange={(e) => {
                            setReply({
                              ...reply,
                              text: e.target.value,
                            });
                          }}
                          onKeyDown={(e) => {
                            if (e.keyCode == 13 && !e.shiftKey) {
                              e.preventDefault();
                              sendReply();
                              return false;
                            }
                          }}
                          onBlur={() => {
                            setReply({
                              ...reply,
                              show: false,
                              text: "",
                            });
                          }}
                          maxLength={1000}
                          minRows={1}
                          autoFocus={true}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
