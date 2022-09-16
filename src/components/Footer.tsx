import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer">
      <a href="https://twitter.com/t3dotgg">Twitter</a>
      <span className="p-4">{"-"}</span>
      <Link href="/results">
        <a>Results</a>
      </Link>
      <span className="p-4">{"-"}</span>
      <Link href="/about">
        <a>About</a>
      </Link>
      <span className="p-4">{"-"}</span>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  )
}
