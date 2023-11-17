import { Link, routes } from '@redwoodjs/router'

import Avatar from '../Avatar/Avatar'

const Navbar = () => {
  return (
    <div className="w-100 flex flex-row justify-between p-4 shadow-md">
      <Link to={routes.home()}>
        <h2 className="text-xl font-bold">Library</h2>
      </Link>
      <div className="flex flex-row justify-between">
        <Link className="pr-2" to={routes.books()}>
          Books
        </Link>
        <Link className="pr-2" to={routes.authors()}>
          Author
        </Link>
        <Link className="pr-2" to={routes.publishers()}>
          Publisher
        </Link>

        <Avatar imageSrc="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/23.jpg" />
      </div>
    </div>
  )
}

export default Navbar
