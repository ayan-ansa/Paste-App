import { MdOutlineContentCopy } from "react-icons/md";
import { addPaste, updatePaste } from "../../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    text: "",
  });
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const { id } = useParams();

  const handleAdd = () => {
    setSearchParams({});
    setData({
      title: "",
      text: "",
    });
  };

  useEffect(() => {
    if (pasteId || id) {
      const paste = pastes.find((paste) => paste.id === pasteId || id);
      if (paste) {
        setData({
          title: paste.title,
          text: paste.text,
        });
      }
    }
  }, [pasteId, id]);

  const createPaste = () => {
    if (data.title && data.text) {
      const paste = {
        id: crypto.randomUUID(),
        title: data.title,
        text: data.text,
        pasteTime: new Date().toLocaleString(),
      };
      if (pasteId) {
        dispatch(updatePaste({ ...paste, id: pasteId }));
      } else {
        dispatch(addPaste(paste));
        toast.success("Paste created successfully");
      }
      setData({
        title: "",
        text: "",
      });
      setSearchParams({});
    } else {
      toast.error("Please fill the fields");
    }
  };
  const handleCopy = () => {
    if (!id) {
      if (data.text) {
        navigator.clipboard.writeText(data.text);
        toast.success("Text copied to clipboard");
      } else {
        toast.error("Please fill the field");
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto min-h-[80vh] mt-10 px-2">
      <div className="w-full flex items-center gap-3">
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Add Text.."
          className="p-2 text-sm outline-blue-700 flex-1 rounded-md border"
          disabled={id ? true : false}
        />

        <button
          onClick={createPaste}
          className="p-2 rounded-md bg-blue-700 text-sm text-white"
          disabled={id ? true : false}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
        {pasteId && (
          <div className="p-[6px] rounded bg-blue-700">
            <FiPlusCircle
              className="text-white text-[22px] cursor-pointer"
              onClick={handleAdd}
            />
          </div>
        )}
      </div>
      <div className="border mt-7">
        <div className="flex justify-between items-center h-7 px-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div onClick={handleCopy}>
            <MdOutlineContentCopy className="text-xl cursor-pointer" />
          </div>
        </div>
        <textarea
          rows={14}
          value={data.text}
          onChange={(e) => setData({ ...data, text: e.target.value })}
          className="w-full p-2 border-t outline-none"
          placeholder="Write your text here..."
          disabled={id ? true : false}
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
