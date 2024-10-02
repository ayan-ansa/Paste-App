import {
  MdOutlineContentCopy,
  MdOutlineRemoveRedEye,
  MdEdit,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deletePaste } from "../../redux/pasteSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function Pastes() {
  const dispatch = useDispatch();

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchVal, setSearchVal] = useState("");

  const filteredPaste = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto min-h-[80vh] mt-10 px-2">
      <div>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search pastes..."
          className="p-2 w-full text-sm rounded-md border"
        />
      </div>
      <div className="mt-5 border py-3">
        <h2 className="px-3 pb-3 text-3xl font-extrabold">All Pastes</h2>
        <div
          id="paste-items"
          className="flex flex-col gap-3 px-3 pt-3 border-t"
        >
          {filteredPaste.length > 0 ? (
            filteredPaste.map(({ id, title, text, pasteTime }) => (
              <div
                key={id}
                className="flex justify-between  items-center gap-4 border p-3"
              >
                <div id="left" className="flex flex-col space-y-3">
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <p className="text-sm mt-2 max-w-xl">{text}</p>
                </div>
                <div id="right" className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/?pasteId=${id}`}>
                      <div
                        id="edit"
                        className="border p-[5px] cursor-pointer rounded-sm hover:text-blue-600"
                      >
                        <MdEdit className="text-xl" />
                      </div>
                    </Link>

                    <div
                      id="delete"
                      className="border p-[5px] cursor-pointer rounded-sm hover:text-red-600"
                      onClick={() => dispatch(deletePaste({ id }))}
                    >
                      <RiDeleteBin6Line className="text-xl" />
                    </div>

                    <Link to={`/pastes/${id}`}>
                      <div
                        id="view"
                        className="border p-[5px] cursor-pointer rounded-sm hover:text-[#2F3A83]"
                      >
                        <MdOutlineRemoveRedEye className="text-xl" />
                      </div>
                    </Link>

                    <div
                      id="copy"
                      className="border p-[5px] cursor-pointer rounded-sm hover:text-green-600"
                      onClick={() => {
                        navigator.clipboard.writeText(text);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <MdOutlineContentCopy className="text-xl" />
                    </div>
                  </div>
                  <p className="text-end text-sm">{pasteTime}</p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-2xl font-semibold text-yellow-700">
              No Data Found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pastes;
