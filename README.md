# Player position reset
This app helps you reset the position of the player once the player is outside a certain range

## Usage
You can add this app in the .scn file

- `start` object is the start of the range

    Default start object : `{ "x": -Infinity, "y": -Infinity, "z": -Infinity }`

- `end` object is the end of the range

    Default end object : `{ "x": Infinity, "y": Infinity, "z": Infinity }`

- `reset` object is where the player will be reset to

    Default reset object : `{ "x": 0, "y": 0, "z": 0 }`

## Example :
```
{
  "components": [
    {
      "key": "start",
      "value": {
        "y": -50
      }
    },
    {
      "key": "end",
      "value": {
        "z": 30
      }
    },
    {
      "key": "reset",
      "value": {
        "y": 10,
        "z": -25
      }
    }
  ],
  "start_url": "https://webaverse.github.io/player-position-reset/"
}
```
