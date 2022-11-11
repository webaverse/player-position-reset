# Player position reset
This app helps you reset the position of the player once the player is outside a certain range

## Usage
You can add this app in the .scn file

- `start` component is the start of the range

    Default start component : `{ "x": -Infinity, "y": -Infinity, "z": -Infinity }`

- `end` component is the end of the range

    Default end component : `{ "x": Infinity, "y": Infinity, "z": Infinity }`

- `reset` component is where the player will be reset to

    Default reset component : `{ "x": 0, "y": 0, "z": 0 }`

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
