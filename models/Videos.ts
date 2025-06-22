import mongoose, { model, models, Schema } from "mongoose";

export const VideoDimensions = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls: boolean;
  transitions?: {
    width: number;
    height: number;
    quantity?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transitions: {
      width: {
        type: Number,
        default: VideoDimensions.width,
      },
      height: {
        type: Number,
        default: VideoDimensions.height,
      },
      quantity: {
        type: Number,
        min: 1,
        max: 10,
      },
    },
  },
  { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
