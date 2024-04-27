import { Meta, StoryObj } from "@storybook/react";
import { VerticalBar as VerticalBarComponent } from "./VerticalBar";

const meta = {
  title: "Chart/VerticalBar",
  component: VerticalBarComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    dataObject: {
      a: 100,
      b: 50,
      c: 20,
    },
  },
} satisfies Meta<typeof VerticalBarComponent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    chartName: "경찰청",
    dataObject: {
      a: 100,
      b: 50,
      c: 20,
      d: 10,
    },
    label: "VerticalBarChart",
  },
};
