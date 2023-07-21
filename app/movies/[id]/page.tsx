export const dynamic = "force-dynamic";

import SubmitButton from "@/app/components/SubmitButton";
import {db} from "@/app/db";
import {revalidatePath} from "next/cache";

async function getComments(id: string) {
  const comments = await db.comment.findMany({
    where: {
      movieId: id,
    },
    orderBy: {
      createdDt: "desc",
    },
  });

  return comments;
}

async function postComment(formComment: FormData) {
  "use server";

  const comment = await db.comment.create({
    data: {
      message: formComment.get("comment") as string,
      movieId: formComment.get("id") as string,
    },
  });

  revalidatePath("/movies/[id]");
}

export default async function Page({params}: {params: {id: string}}) {
  const comments = await getComments(params.id);

  return (
    <div className="rounded-lg border p-3">
      <h1 className="text-xl font-semibold mb-5">Your Opinion</h1>

      <div>
        <form action={postComment}>
          <textarea
            name="comment"
            placeholder="add your comment..."
            className="w-full border border-teal-500 rounded-lg p-2"
          ></textarea>
          <input type="hidden" name="id" value={params.id} />
          <SubmitButton />
        </form>

        <div className="mt-5 flex-col gap-y-3">
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
