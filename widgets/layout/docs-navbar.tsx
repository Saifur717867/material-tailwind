import React from "react";
import Link from "next/link";
import {
  Navbar as Navbar,
  Collapse,
  IconButton,
  Chip,
  Typography,
  List,
  ListItem,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { Logo, Search } from "@widgets";
import { formatNumber } from "@utils";

interface DocsNavbar {
  slug: string[];
  setMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const LinkEl = href ? Link : "span";

  return (
    <LinkEl passHref href={href ? href : ""}>
      <ListItem className="px-4 py-2.5 text-sm text-blue-gray-800 hover:text-primary">
        {children}
      </ListItem>
    </LinkEl>
  );
}

export function DocsNavbar({ slug, setMobileNav }: DocsNavbar) {
  const [stars, setStars] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 && setOpen(false);
    });
  }, []);

  React.useEffect(() => {
    const stars = fetch(
      "https://api.github.com/repos/creativetimofficial/material-tailwind",
    )
      .then((response) => response.json())
      .then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);

  const menuOpenIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 stroke-primary text-primary"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const menuCloseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 stroke-primary text-primary"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const navbarMenu = (
    <div className="flex w-full flex-col justify-end lg:!ml-auto lg:flex-row">
      <List className="px-0 lg:!flex-row">
        <NavItem href="/docs/react/installation">Docs</NavItem>
        <NavItem href="/blocks">Blocks</NavItem>
        {/* <Menu placement="bottom" offset={-2.5} allowHover>
          <MenuHandler>
            <span>
              <NavItem>Ecosystem</NavItem>
            </span>
          </MenuHandler>
          <MenuList className="rounded-[10px] p-1.5">
            <Link
              target="_blank"
              className="!outline-none"
              href="https://www.creative-tim.com/services/updivision?ref=material-tailwind"
            >
              <MenuItem className="flex items-center gap-2 rounded-md text-blue-gray-800 hover:text-primary">
                Custom Development
              </MenuItem>
            </Link>
          </MenuList>
        </Menu> */}
        {/*         <NavItem href="/figma">Figma</NavItem> */}
        <NavItem href="/blocks#pricing">Pricing & FAQ</NavItem>
      </List>
      <div className="ml-2 flex items-center gap-2">
        <div className="group relative">
          <Input
            type="email"
            placeholder="Search"
            className="!w-full !border-[1.5px] !border-blue-gray-50 bg-white text-blue-gray-800 ring-4 ring-transparent placeholder:text-blue-gray-600 focus:!border-primary focus:!border-t-primary group-hover:!border-primary"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
          <div className="absolute right-3.5 top-2/4 -translate-y-2/4">
            <kbd className="rounded border border-blue-gray-100 bg-white px-1 pb-0 pt-px text-xs font-medium text-gray-900 shadow shadow-black/5">
              <span className="mr-0.5 inline-block translate-y-[1.5px] text-base">
                ⌘
              </span>
              K
            </kbd>
          </div>
          <div className="absolute inset-0 w-full opacity-0">
            <Search />
            ab
          </div>
        </div>
        <Tooltip content="Help with a star" placement="bottom" offset={-2.5}>
          <a
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 p-1.5 text-primary"
            href="https://github.com/creativetimofficial/material-tailwind?ref=material-tailwind"
          >
            <Chip
              value={<span className="-ml-1.5">{stars}</span>}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="!ml-0 mt-[2.5px] h-3.5 w-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              className="flex-items-center gap-2 bg-primary py-[3px] !pr-2 text-xs"
            />
            <i className="fab fa-github text-xl leading-none" />
          </a>
        </Tooltip>
        <Tooltip content="Join our community" placement="bottom" offset={-2.5}>
          <a
            target="_blank"
            rel="noreferrer"
            className="p-1.5 leading-none text-primary"
            href="https://discord.com/invite/7xzMRsRebr"
          >
            <i className="fab fa-discord text-lg leading-none" />
          </a>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <div className="sticky top-0 z-[999] flex w-full items-center">
      <Navbar
        className="w-full max-w-full rounded-none border-b-[1.5px] !border-blue-gray-50 bg-white py-1.5 !pl-2 !pr-3 lg:!px-4 lg:!py-0.5"
        shadow={false}
      >
        <div className="container mx-auto">
          <div className={`flex w-full items-center !justify-between`}>
            <Link
              href="/"
              className="py-2.375 mr-4 flex items-center gap-2 text-inherit lg:ml-0"
            >
              <Logo />
              <Typography
                variant="small"
                className="font-bold leading-tight text-primary"
              >
                Material <br /> Tailwind
              </Typography>
              <Chip
                value="v2.1.4"
                variant="outlined"
                className="ml-2 rounded-full border-[1.5px] border-blue-gray-50 pb-1 pt-1.5 text-primary"
              />
              <hr className="mx-2 h-8 border-r border-primary/10" />
              <Typography
                variant="small"
                className="font-medium leading-tight text-primary"
              >
                Documentation
              </Typography>
            </Link>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-primary hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpen(!open)}
            >
              {open ? menuCloseIcon : menuOpenIcon}
            </IconButton>
            <div className="lg:base-auto hidden flex-grow basis-full items-center lg:flex lg-max:max-h-0">
              {navbarMenu}
            </div>
          </div>

          <Collapse open={open}>
            <div className="overflow-hidden pb-1 lg:overflow-visible">
              {navbarMenu}
            </div>
          </Collapse>
        </div>
        <div className="mt-2 flex items-center border-t border-blue-gray-50 pb-2 pt-4 lg:hidden">
          <button
            type="button"
            className="text-blue-gray-900"
            onClick={() => setMobileNav(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <ol className="ml-4 flex min-w-0 whitespace-nowrap text-sm leading-6 text-blue-gray-700">
            {slug.map((el, key) => (
              <li key={key} className="flex items-center capitalize">
                {el}
                {key === slug.length - 1 ? (
                  ""
                ) : (
                  <svg
                    width="3"
                    height="6"
                    className="mx-3 overflow-visible text-blue-gray-300"
                  >
                    <path
                      d="M0 0L3 3L0 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Navbar>
    </div>
  );
}

export default DocsNavbar;
