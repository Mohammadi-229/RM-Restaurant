/* ============================================================
   RM RESTAURANT — MENU
   ------------------------------------------------------------
   Add, remove or edit dishes below.
   Each dish looks like this:

   { name: "DISH NAME", desc: "short description", price: "₹350" }

   - Leave price as "" (empty quotes) to hide the price for that dish.
   - Copy an existing { ... } line to add a new dish, then edit it.
   - Don't remove the commas between dishes.
   ============================================================ */

const MENU = {
  STARTER: [
    {
      name: "PANEER TIKKA",
      desc: "Marinated cottage cheese cubes grilled with aromatic spices.",
      price: "₹280"
    },
    {
      name: "CHICKEN LOLLIPOP",
      desc: "Crispy chicken prepared with aromatic spices.",
      price: "₹320"
    }
  ],

  MAIN: [
    {
      name: "CHICKEN BIRYANI",
      desc: "Fragrant basmati rice layered with spiced chicken and herbs.",
      price: "₹420"
    },
    {
      name: "BUTTER PANEER & GARLIC NAAN",
      desc: "Creamy paneer curry served with freshly prepared garlic naan.",
      price: "₹380"
    }
  ],

  DESSERT: [
    {
      name: "RASMALAI",
      desc: "Soft cheese dumplings served in sweetened milk.",
      price: "₹150"
    },
    {
      name: "GULAB JAMUN",
      desc: "Warm milk-based sweets soaked in fragrant sugar syrup.",
      price: "₹130"
    }
  ]
};
