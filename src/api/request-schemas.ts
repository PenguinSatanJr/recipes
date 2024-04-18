import { z } from 'zod';
import { MAX_INGREDIENT_NAME_LENGTH } from '../entity/ingredient';
import {
  MAX_RECIPE_DESCRIPTION_LENGTH,
  MAX_RECIPE_TITLE_LENGTH,
} from '../entity/recipe';
import { MealTime, WeekDay } from '../types';
import { MAX_MENU_TITLE_LENGTH } from '../entity/menu';

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, ' ').trim();

const normalizedString = ({ min = 0, max }: { min?: number; max: number }) =>
  z.string().transform(normalizeWhitespace).pipe(z.string().min(min).max(max));

const WeekDayEnum = z.nativeEnum(WeekDay);

const MealTimeEnum = z.nativeEnum(MealTime);

export const idPathParamSchema = z.object({
  id: z.coerce.number().int(),
});

export const createIngredientBodySchema = z.object({
  name: normalizedString({ max: MAX_INGREDIENT_NAME_LENGTH, min: 1 }),
  calories: z.number(),
  protein: z.number(),
  fat: z.number(),
  carbs: z.number(),
});

export const createRecipeBodySchema = z.object({
  title: normalizedString({ max: MAX_RECIPE_TITLE_LENGTH, min: 1 }),
  description: normalizedString({ max: MAX_RECIPE_DESCRIPTION_LENGTH, min: 1 }),
});

export const getMenuRecipesQuerySchema = z.object({
  menuId: z.coerce.number().int(),
});

export const createMenuRecipeBodySchema = z.object({
  menuId: z.coerce.number().int(),
  recipeId: z.coerce.number().int(),
  weekDay: WeekDayEnum,
  mealTime: MealTimeEnum,
});

export const createMenuBodySchema = z.object({
  title: normalizedString({ max: MAX_MENU_TITLE_LENGTH, min: 1 }),
});
