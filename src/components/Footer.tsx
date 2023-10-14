export default function Footer() {
  return (
    <footer className="flex items-center justify-center h-30 my-2 border-t-2 border-purple-600 rounded-md px-1 w-11/12 mx-auto">
      <span className="text-sm font-bold text-gray-500  text-justify md:text-center ">
        Our project has been developed using MongoDB and Next.js. For more
        information and to view the source code of the project, please visit the
        following open-source link on{" "}
        <a
          href="https://github.com/EhsanKey/url-shorter"
          className="text-purple-600 hover:underline"
        >
          GitHub
        </a>
      </span>
    </footer>
  );
}
