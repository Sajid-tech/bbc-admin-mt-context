<div className={`relative`}>
  <Link to="/home" className="flex items-center justify-center p-4">
    <div className="flex items-center">
      <img src="/logo.png" alt="Logo" className="h-16 w-auto" />{" "}
      {/* Increased height */}
    </div>
  </Link>
  <IconButton
    variant="text"
    color="white"
    size="sm"
    ripple={false}
    className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
    onClick={() => setOpenSideNav(false)}
  >
    <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
  </IconButton>
</div>;
