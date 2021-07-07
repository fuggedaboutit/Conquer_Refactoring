### Mars Rover Refactoring Problem

## Background
화성탐사로봇 Rover는 지시(instruction)를 받아 움직이며 화성을 탐사합니다.

![rover](https://user-images.githubusercontent.com/77006427/124591528-573d5f80-de97-11eb-81de-70952b81970e.png)

Rover가 바로 보고있는 방향과 현재 위치는 다음과 같이 표현됩니다.

```javascript
cosnt rover = {
	//Rover가 보고 있는 방향 E: east
	facing: 'E',

	//Rover의 현재 위치
	position: {
		x: 5,
		y: 5,
	},

	//Rover의 현재 상태, 미션 진행 불가 시, fail로 되며, 이 후 지시를 받지 않는다.
	status: "success",
}
```

💡 주의사항
Rover가 **U(Upward)** 방향으로 되있을떄는 뒤짚어져있는 상태입니다. 
이 후의 지시사항에 따르지 못합니다.
😪

### Commands

```bash
//To run test
npm test


//To overview coverage of tests
npm run coverage


//To Run tests every changes made
npm run watch 

//Run lint to check and follow coding style guide.
npm run lint
```

#### Look Up 
- [Martin Fowler's Refactoring catalog](https://refactoring.com/catalog/)

All Rights Reserved [@Codemanship](https://github.com/jasongorman)