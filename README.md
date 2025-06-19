# React Native Toast

React Native JS level toast for both android and IOS which can be called from any component of your app.

## Install

```
npm install react-native-toast-context
```

OR

```
yarn add react-native-toast-context
```

## Example

![Top Example](https://github.com/asaeed14/react-native-toast/blob/main/top.gif)
![Bottom Example](https://github.com/asaeed14/react-native-toast/blob/main/bottom.gif)

## How to Use

Wrap your application entry point with `ToastProvider`.

```ts
import { ToastProvider } from 'react-native-toast-context';

const App = () => {
  return (
    <ToastProvider
      defaultTheme={{
        message: 'Hello Toast',
        delay: 1000,
        position: 'bottom' | 'top',
        bottomOffset: 20,
        topOffset: 20,
        backgroundColor: 'black' | 'rgba(0, 0, 0, 0.75)',
        textColor: 'white' | 'black',
        type: 'success',
      }}
    >
      <App />
    </ToastProvider>
  );
};
```

You can use `toast.show()` from any of your component or screen.

```js
// this is jsut an example you can call from anywhere based on your requirement.
import { useToastContext } from 'react-native-toast-context';
import { MaterialIcons } from 'react-native-vector-icons';

const LoginScreen = () => {
  const toast = useToastContext();
  useEffect(() => {
    if (login.success) {
      toast.show({
        message: 'Login Successfully',
        delay: 3000,
        icon: <MaterialIcons name="check-circle" size={24} color="green" />,
        position: 'bottom',
      });
    }
  }, [login]);

  return <View />;
};
```

## ToastProvider Props

| Name         | Type   | Required |    default    |                                                               Description                                                                |
| ------------ | ------ | :------: | :-----------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
| defaultTheme | object |  false   | default Props | You can provide default theme to make toast consistent to all over the app, default theme props can be replaced by "show" function props |

## Props

| Name            | Type              | Required |        default        |                                    Description                                     |
| --------------- | ----------------- | :------: | :-------------------: | :--------------------------------------------------------------------------------: |
| message         | string            |  false   |     "Hello Toast"     |                                A message for toast                                 |
| delay           | number            |  false   |         1000          |                        Number in miliseconds to delay toast                        |
| position        | 'bottom' or 'top' |  false   |        bottom         |                               Position to show toast                               |
| bottomOffset    | number            |  false   |          32           |                      Space from bottom if position is bottom                       |
| topOffset       | number            |  false   |          32           |                         Space from top if position is top                          |
| backgroundColor | string            |  false   | 'rgba(0, 0, 0, 0.75)' |                             Background color of toast                              |
| textColor       | string            |  false   |       '#ffffff'       |                               Color of toast message                               |
| type            | string            |  false   |          ''           | Right now just "success" type supported. Icon will be shown on the left of message |
| icon            | ReactNode         |  false   |          -            | Custom React component to display as an icon to the left of the message            |
