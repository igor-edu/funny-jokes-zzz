import Joke from '../models/JokeModel.js';

// @route   GET /jokes
export const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.find({}).exec();
    res.json(jokes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route   GET /jokes/:id
export const getSpecificJoke = async (req, res) => {
  try {
    const joke = await Joke.findById(req.params.id).exec();

    if (joke) {
      res.json(joke);
    } else {
      res.status(400).json({ error: 'no joke found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route   POST /jokes
export const createNewJoke = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newJoke = await Joke.create({
      title,
      content,
      creator: req.user.name,
    });

    res.status(201).json(newJoke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route   DELETE /jokes/:id
export const deleteSpecificJoke = async (req, res) => {
  try {
    const removed = await Joke.findByIdAndRemove(req.params.id).exec();

    if (!removed) {
      res.status(400).json({ error: 'joke not removed' });
    } else {
      res.json(removed);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route   PUT /jokes/:id
export const updateSpecificJoke = async (req, res) => {
  const id = req.params.id;
  const { iconName } = req.body;
  const userName = req.user.name;

  try {
    const old = await Joke.findById(id);

    const arr = old[iconName];

    if (arr.includes(userName)) {
      const index = arr.indexOf(userName);
      arr.splice(index, 1);
    } else {
      arr.push(userName);
    }

    const updated = await old.save();

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
