import { Meta, StoryObj } from "@storybook/react";
import { MenuCard } from "./MenuCard";

const meta = {
    component : MenuCard,
} satisfies Meta<typeof MenuCard>

export default meta;

type Story = StoryObj<typeof meta>;

export const _MenuCard : Story = {
    
}