const AdminText = ({ content, align = 'left', color, fontFamily }) => {
  return <p style={{ textAlign: align, color: color, fontFamily: fontFamily }} className="whitespace-pre-wrap">{content}</p>;
};

export default AdminText;
