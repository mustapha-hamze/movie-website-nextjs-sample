"use client";

import {experimental_useFormStatus as useFormSatus} from "react-dom";

export default function SubmitButton() {
  const {pending} = useFormSatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-teal-500 px-4 py-2 rounded-lg text-white mt-3"
    >
      {pending ? <>Loading...</> : <>Add Comment</>}
    </button>
  );
}
