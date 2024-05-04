export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-t bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © 2024 Band Blend. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a className="text-sm hover:underline dark:text-gray-400" href="#">
          Privacy
        </a>
        <a className="text-sm hover:underline dark:text-gray-400" href="#">
          Terms
        </a>
      </div>
    </footer>
  );
}
