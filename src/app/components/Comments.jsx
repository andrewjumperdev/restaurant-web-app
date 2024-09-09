
const Comments = ({ comments }) => {
  return (
    <div className="max-w-xl p-6 bg-white rounded-md">
      <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
      {comments.length === 0 ? (
        <p>No hay comentarios para este ítem.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li key={index} className="border border-gray-300 p-4 rounded-md">
              <p className="font-semibold">{comment.userName}</p>
              <p className="mt-2">{comment.comment}</p>
              <p className="text-gray-500 text-sm mt-2">{new Date(comment.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
