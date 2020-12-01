# React Native Toast

React Native JS level toast for both android and IOS which can be called from any component of your app.

## Install

```
npm install @asaeed14/react-native-toast
```

OR

```
yarn add @asaeed14/react-native-toast
```

## Example

![Toast](https://github.com/asaeed14/react-native-toast/blob/main/toast.gif)

## How to Use

Wrap your application entry point with `ToastProvider`.

```ts
import { ToastProvider } from '@asaeed14/react-native-toast';

const App = () => {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
};
```

You can use `toast.show({})` from any of your component or screen.

```js
// this is jsut an example you can call from anywhere based on your requirement.
import { useToastContext } from '@asaeed14/react-native-toast';

const LoginScreen = () => {
  const toast = useToastContext();
  useEffect(() => {
    if (login.success) {
      toast.show({
        message: 'Login Successfully',
        delay: 3000,
        position: 'bottom' | 'top',
        bottomOffset: 32,
        topOffest: 32,
        backgroundColor: 'black' | 'rgba(0, 0, 0, 0.75)',
        textColor: 'white' | 'black',
      });
    }
  }, [login]);

  return <View />;
};
```

## Props

| Name            | Type              | Required |            default             |                                    Description                                     |
| --------------- | ----------------- | :------: | :----------------------------: | :--------------------------------------------------------------------------------: |
| message         | string            |  false   | "welome to react native toast" |                                A message for toast                                 |
| delay           | number            |  false   |              1000              |                        Number in miliseconds to delay toast                        |
| position        | 'bottom' or 'top' |  false   |             bottom             |                               Position to show toast                               |
| bottomOffset    | number            |  false   |               32               |                      Space from bottom if position is bottom                       |
| topOffset       | number            |  false   |               32               |                         Space from top if position is top                          |
| backgroundColor | string            |  false   |     'rgba(0, 0, 0, 0.75)'      |                             Background color of toast                              |
| textColor       | string            |  false   |           '#ffffff'            |                               Color of toast message                               |
| type            | string            |  false   |               ''               | Right now just "success" type supported. Icon will be shown on the left of message |
