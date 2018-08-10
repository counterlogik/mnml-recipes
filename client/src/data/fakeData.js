const fakeData = {
  ingredients: {
    byId: {
      ingredient1: {
        ingredient: "10 ounces (283g) extra-firm tofu",
        id: "ingredient1"
      },
      ingredient2: {
        ingredient: "1 Tbsp (15ml) toasted sesame oil",
        id: "ingredient2"
      },
      ingredient3: {
        ingredient:
          "3 cups (~350g) raw vegetables, chopped (broccoli, carrots,  and/or cauliflower)",
        id: "ingredient3"
      },
      ingredient4: {
        ingredient:
          "1–2 Tbsp (15–30g) chili garlic sauce (reduce for less heat)",
        id: "ingredient4"
      },
      ingredient5: {
        ingredient:
          "¼ cup (60ml) maple syrup or agave nectar (or substitute  coconut sugar)",
        id: "ingredient5"
      },
      ingredient6: {
        ingredient:
          "¼ cup (60ml) tamari or soy sauce (if gluten-free, use  tamari)",
        id: "ingredient6"
      },
      ingredient7: {
        ingredient: "3 cloves garlic (1½ Tbsp or 9g), minced",
        id: "ingredient7"
      },
      ingredient8: {
        ingredient: "1 lime, juiced (2 Tbsp or 30ml)",
        id: "ingredient8"
      },
      ingredient9: {
        ingredient: "1 Tbsp (15ml) toasted sesame oil",
        id: "ingredient9"
      },
      ingredient10: {
        ingredient:
          "1 Tbsp (8g) cornstarch or arrowroot starch, for thickening",
        id: "ingredient10"
      },
      ingredient11: {
        id: "ingredient11",
        ingredient: "10 ounces (283g) angel hair or linguini pasta (see note)"
      },
      ingredient12: {
        id: "ingredient12",
        ingredient: "1 ripe tomato (123g)"
      },
      ingredient13: {
        id: "ingredient13",
        ingredient: "2 red bell peppers (238g)"
      },
      ingredient42: {
        id: "ingredient42",
        ingredient: "½ cup (56g) raw almonds"
      },
      ingredient14: {
        id: "ingredient14",
        ingredient: "4 cloves garlic (12g), skin on"
      },
      ingredient15: {
        id: "ingredient15",
        ingredient: "1 Tbsp (15ml) grape seed oil or avocado oil"
      },
      ingredient16: {
        id: "ingredient16",
        ingredient: "¼ cup (60ml) olive oil"
      },
      ingredient17: {
        id: "ingredient17",
        ingredient:
          "1–2 Tbsp (15–30ml) red wine vinegar (reduce for less acidity)"
      },
      ingredient18: {
        id: "ingredient18",
        ingredient: "¼ tsp smoked paprika"
      },
      ingredient19: {
        id: "ingredient19",
        ingredient: "½ tsp sea salt"
      },
      ingredient20: {
        id: "ingredient20",
        ingredient: "1–2 Tbsp (15–30ml) maple syrup"
      },
      ingredient21: {
        id: "ingredient21",
        ingredient: "1–2 tsp harissa paste or"
      },
      ingredient22: {
        id: "ingredient22",
        ingredient: "¼ tsp red pepper flake"
      },
      ingredient23: {
        id: "ingredient23",
        ingredient: "2–3 Tbsp (10–15g) Vegan Parmesan"
      },
      ingredient24: {
        id: "ingredient24",
        ingredient: "Fresh parsley or basil, chopped"
      },
      ingredient25: {
        id: "ingredient25",
        ingredient: "2 Tbsp (30ml) olive oil, grape seed oil, or coconut oil"
      },
      ingredient26: {
        id: "ingredient26",
        ingredient: "3 cloves garlic (1½ Tbsp or 9g), minced"
      },
      ingredient27: {
        id: "ingredient27",
        ingredient: "½ medium white or yellow onion (55g), diced"
      },
      ingredient28: {
        id: "ingredient28",
        ingredient: "1½ cups (192g) coarsely chopped carrots"
      },
      ingredient29: {
        id: "ingredient29",
        ingredient: "6 red or yellow baby potatoes, cut into bite-size wedges"
      },
      ingredient30: {
        id: "ingredient30",
        ingredient:
          "Healthy pinch each of sea salt and black pepper, plus more to taste"
      },
      ingredient31: {
        id: "ingredient31",
        ingredient:
          "1 15-ounce (425g) can chickpeas, thoroughly rinsed and drained"
      },
      ingredient32: {
        id: "ingredient32",
        ingredient: "¼ cup (80g) red curry paste, plus more to taste"
      },
      ingredient33: {
        id: "ingredient33",
        ingredient: "1 6-ounce (170g) can tomato paste"
      },
      ingredient34: {
        id: "ingredient34",
        ingredient: "1½ cups (360ml) vegetable broth"
      },
      ingredient35: {
        id: "ingredient35",
        ingredient: "1 cup (240ml) water"
      },
      ingredient36: {
        id: "ingredient36",
        ingredient:
          "2 Tbsp (24g) coconut sugar (or substitute organic cane sugar or maple syrup), plus more to taste"
      },
      ingredient37: {
        id: "ingredient37",
        ingredient: "½ tsp ground turmeric"
      },
      ingredient38: {
        id: "ingredient38",
        ingredient: "Quick-Pickled Onions"
      },
      ingredient39: {
        id: "ingredient39",
        ingredient: "3 cups cooked basmati rice or Cauliflower Rice"
      },
      ingredient40: {
        id: "ingredient40",
        ingredient: "Fresh chopped cilantro or parsley"
      },
      ingredient41: {
        id: "ingredient41",
        ingredient: "Sliced ripe mango with chili powder"
      }
    },
    allIds: [
      "ingredient1",
      "ingredient2",
      "ingredient3",
      "ingredient4",
      "ingredient5",
      "ingredient6",
      "ingredient7",
      "ingredient8",
      "ingredient9",
      "ingredient10",
      "ingredient11",
      "ingredient12",
      "ingredient13",
      "ingredient14",
      "ingredient15",
      "ingredient16",
      "ingredient17",
      "ingredient18",
      "ingredient19",
      "ingredient20",
      "ingredient21",
      "ingredient22",
      "ingredient23",
      "ingredient24",
      "ingredient25",
      "ingredient26",
      "ingredient27",
      "ingredient28",
      "ingredient29",
      "ingredient30",
      "ingredient31",
      "ingredient32",
      "ingredient33",
      "ingredient34",
      "ingredient35",
      "ingredient36",
      "ingredient37",
      "ingredient38",
      "ingredient39",
      "ingredient40",
      "ingredient41",
      "ingredient42"
    ]
  },
  steps: {
    byId: {
      step1: {
        id: "step1",
        ingredient:
          "Wrap the tofu in a clean, absorbent towel and set something heavy on top, such as a cast-iron skillet, to aid in absorbing excess moisture. Let rest for 15 minutes. Prepare the marinade at this time."
      },
      step2: {
        id: "step2",
        ingredient:
          "Add all of the marinade ingredients (except the cornstarch) to a plastic bag and toss/shake to combine. Once the tofu is pressed, cube it and add it to the marinade. Toss to combine."
      },
      step3: {
        id: "step3",
        ingredient:
          "Place in the refrigerator for at least 2 hours, preferably overnight (up to 2 days). The longer it rests, the stronger and more pronounced the flavor will become."
      },
      step4: {
        id: "step4",
        ingredient:
          "When ready to cook, heat a large skillet over medium heat. Once hot, add 1 Tbsp (15ml) sesame oil. Use a slotted spoon to scoop the tofu into the skillet, leaving the majority of the marinade behind."
      },
      step5: {
        id: "step5",
        ingredient:
          "Cook for 4–5 minutes, stirring frequently and adding 1–2 Tbsp (15–30 ml) marinade to add extra flavor. Flip/toss the tofu around to get all of the sides evenly browned. Reduce the heat if browning too quickly. Remove the pan from the heat and scoop out the tofu. Set aside (see note)."
      },
      step6: {
        id: "step6",
        ingredient:
          "Add the cornstarch to the remaining marinade in the plastic bag. Toss the contents to thicken the sauce."
      },
      step7: {
        id: "step7",
        ingredient:
          "Place the pan back over medium heat. Add the vegetables and remaining marinade. Sauté the vegetables, stirring frequently, for 1–2 minutes or until just tender. Then add the tofu back in and cook for 1–2 minutes more."
      },
      step8: {
        id: "step8",
        ingredient:
          "Serve as is or with white rice, brown rice, or Cauliflower Rice. Serve with extra chili garlic sauce for added heat."
      },
      step9: {
        id: "step9",
        ingredient:
          "Leftovers will keep stored in the refrigerator for up to 3 days. Reheat in the microwave or a skillet over medium heat until hot."
      },
      step10: {
        id: "step10",
        step: "Preheat the oven to 425 degrees F (218 degrees C)."
      },
      step11: {
        id: "step11",
        step:
          "In the meantime, cook the pasta according to the package instructions, drain, and set aside. Cover the pasta with a towel to keep warm."
      },
      step12: {
        id: "step12",
        step:
          "Arrange tomato and bell peppers, still whole with stems, on one end of a rimmed baking sheet. On the other end of the baking sheet, arrange the almonds and garlic (still in skin). Lightly drizzle the garlic with the grape seed oil."
      },
      step13: {
        id: "step13",
        step:
          "Place the baking sheet in the oven and roast the almonds for 6–7 minutes, then remove from pan and set aside. Bake garlic for another 5–8 minutes, then remove and set aside."
      },
      step14: {
        id: "step14",
        step:
          "Allow tomato and red pepper to roast until the skin is bubbled and mostly blackened, turning/flipping periodically to char all sides."
      },
      step15: {
        id: "step15",
        step:
          "Once charred, wrap the roasted red peppers in foil to steam for 2–3 minutes, then peel away the skin, seeds, and core. Also, remove the core of the tomato and remove the skin from the garlic."
      },
      step16: {
        id: "step16",
        step:
          "Add the peeled peppers, cored tomato, almonds, garlic, olive oil, vinegar, paprika, salt, maple syrup, and harissa to the bowl of a blender or food processor. Purée until smooth, scraping down the sides as needed. Taste and adjust the seasonings as desired, adding more harissa paste for heat, vinegar for acidity, or salt for balance."
      },
      step17: {
        id: "step17",
        step:
          "Serve over pasta with Vegan Parmesan and any desired fresh herbs. Leftovers keep well, covered in the refrigerator, for 3–4 days, though best when fresh."
      },
      step18: {
        id: "step18",
        step:
          "Heat a large pot over medium heat. Once hot, add the olive oil, garlic, onion, carrots, and potatoes. Season with the salt and pepper. Cover and cook for 4 minutes."
      },
      step19: {
        id: "step19",
        step:
          "Add chickpeas and curry paste. Stir to coat. Cook for 2 minutes more, then remove from the heat."
      },
      step20: {
        id: "step20",
        step:
          "Add tomato paste, broth, water, coconut sugar, and turmeric. Stir to combine. Place back over medium heat and cover. The liquid should barely cover all of the ingredients, so add more water if needed."
      },
      step21: {
        id: "step21",
        step:
          "Once the mixture has reached a simmer, reduce the heat to low and continue simmering, covered, for 20–25 minutes, or until the potatoes are fork tender and the flavor has permeated the chickpeas and vegetables."
      },
      step22: {
        id: "step22",
        step:
          "While the curry is cooking, prepare any side dishes or toppings you wish, such as basmati rice, Cauliflower Rice, or Quick-Pickled Onions."
      },
      step23: {
        id: "step23",
        step:
          "Taste and adjust the seasonings as needed, adding more curry paste for depth of flavor and heat, salt, or coconut sugar for sweetness."
      },
      step24: {
        id: "step24",
        step:
          "Serve as is or with desired toppings or sides. Leftovers will stay fresh in the refrigerator for 3–4 days, or in the freezer for up to 1 month. Best when fresh."
      }
    },
    allIds: [
      "step1",
      "step2",
      "step3",
      "step4",
      "step5",
      "step6",
      "step7",
      "step8",
      "step9",
      "step10",
      "step11",
      "step12",
      "step13",
      "step14",
      "step15",
      "step16",
      "step17",
      "step18",
      "step19",
      "step20",
      "step21",
      "step22",
      "step23",
      "step24"
    ]
  },
  recipes: {
    byId: {
      recipe1: {
        id: "recipe1",
        title: "Spicy Tofu Vegetable Stir-Fry",
        ingredients: [
          "ingredient1",
          "ingredient2",
          "ingredient3",
          "ingredient4",
          "ingredient5",
          "ingredient6",
          "ingredient7",
          "ingredient8",
          "ingredient9",
          "ingredient10"
        ],
        steps: [
          "step1",
          "step2",
          "step3",
          "step4",
          "step5",
          "step6",
          "step7",
          "step8",
          "step9"
        ]
      },
      recipe2: {
        id: "recipe2",
        title: "Angel Hair Pasta With Harissa Romesco",
        ingredients: [
          "ingredient11",
          "ingredient12",
          "ingredient13",
          "ingredient14",
          "ingredient15",
          "ingredient16",
          "ingredient17",
          "ingredient18",
          "ingredient19",
          "ingredient20",
          "ingredient21",
          "ingredient22",
          "ingredient23",
          "ingredient24",
          "ingredient42"
        ],
        steps: [
          "step10",
          "step11",
          "step12",
          "step13",
          "step14",
          "step15",
          "step16",
          "step17"
        ]
      },
      recipe3: {
        id: "recipe3",
        title: "Carrot, Potato, and Chickpea Red Curry",
        ingredients: [
          "ingredient25",
          "ingredient26",
          "ingredient27",
          "ingredient28",
          "ingredient29",
          "ingredient30",
          "ingredient31",
          "ingredient32",
          "ingredient33",
          "ingredient34",
          "ingredient35",
          "ingredient36",
          "ingredient37",
          "ingredient38",
          "ingredient39",
          "ingredient40",
          "ingredient41",
          "ingredient42"
        ],
        steps: [
          "step18",
          "step19",
          "step20",
          "step21",
          "step22",
          "step23",
          "step24"
        ]
      }
    },
    allIds: ["recipe1", "recipe2", "recipe3"]
  }
};

export default fakeData;
