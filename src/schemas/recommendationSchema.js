import joi from 'joi';

export const newSong = joi.object({
  name: joi.string().min(3).required(),
  youtubeLink: joi.string().pattern(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=|\?v=)([^#?]*).*/).required(),
});
