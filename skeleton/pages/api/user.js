const user = await prisma.user.findUnique({
  where: {
    id: 1,
  },
});

return {
  props: { user }, // will be passed to the page component as props
};
