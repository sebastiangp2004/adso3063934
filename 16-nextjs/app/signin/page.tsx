import Link from "next/link";
import {SignIn} from "@stackframe/stack";

export default function SignInPage() {
  return (
    <div className="min-h-dvh flex flex-col gap-2 p-4 items-center justify-center bg-base-200">
        <SignIn />
        <Link className="btn btn-outline" href="/">
          Go Home
        </Link>
    </div>
  );
}