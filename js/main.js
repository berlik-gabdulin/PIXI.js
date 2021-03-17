const app = new PIXI.Application({
	width: 1390,
	height: 640,
	backgroundColor: 0xffffff,
});

const appContainer = new PIXI.Container();

document.querySelector("#app").appendChild(app.view);

const Sprite = PIXI.Sprite;

PIXI.loader.add(`img/atlas.json`).load(appInit);

const width = app.view.width;
const height = app.view.height;

const setPosition = (item, xPos, yPos) => {
	item.x = xPos;
	item.y = yPos;
};

function clickAndTouch(item, f) {
	item.on("click", f);
	item.on("touchstart", f);
}

function appInit() {
	const id = PIXI.loader.resources[`img/atlas.json`].textures,
		Austin = new Sprite(id["Austin.png"]),
		bgMain = new Sprite(id["bg_main.jpg"]),
		bookStand = new Sprite(id["book_stand.png"]),
		btnContinue = new Sprite(id["btn_continue.png"]),
		finalPopup = new Sprite(id["final_popup.png"]),
		globe = new Sprite(id["globe.png"]),
		iconHammer = new Sprite(id["icon_hammer.png"]),
		logo = new Sprite(id["logo.png"]),
		plantBasket = new Sprite(id["object_hall_plant_in_basket_02.png"]),
		plant1 = new Sprite(id["plant.png"]),
		plant2 = new Sprite(id["plant.png"]),
		sofa = new Sprite(id["sofa.png"]),
		stairOld = new Sprite(id["stair_old.png"]),
		table = new Sprite(id["table.png"]),
		overlay = new PIXI.Graphics();

	app.stage.addChild(bgMain, appContainer);

	const stageItems = [
		[Austin, 696, 113],
		[bookStand, 834, -28],
		[plant1, 1135, 164],
		[plant2, 456, -42],
		[stairOld, width, height - 17],
		[globe, 87, 109],
		[plantBasket, width - 20, height + 35],
		[logo, 32, -20],
		[sofa, 127, 324],
		[table, 202, 196],
		[iconHammer, 1087, 258],
		[overlay, 0, 0],
		[finalPopup, width / 2, height / 2 - 50],
		[
			btnContinue,
			btnContinue.width / 2 + 502,
			height - btnContinue.height / 2 - 17,
		],
	];

	stageItems.forEach((item) => {
		setPosition(item[0], item[1], item[2]);
		appContainer.addChild(item[0]);
		item[0].zIndex = 1;
	});

	logo.alpha = 0;

	setTimeout(() => {
		gsap.to(logo, {
			y: 5,
			alpha: 1,
			ease: Back.easeOut,
		});
	}, 1800);

	plantBasket.zIndex = 20;

	const menuItems = [];
	const stairs = [];

	for (let i = 0; i < 3; i++) {
		const menuItem = new PIXI.Container();

		const iconMenu = new PIXI.Sprite(id["icon_menu.png"]);
		const iconMenuActive = new PIXI.Sprite(id["icon_menu_active.png"]);
		const stairMenu = new Sprite(id[`stair_menu_0${i + 1}.png`]);
		const stairNew = new Sprite(id[`stair_new_0${i + 1}.png`]);
		const stairNewRailing = new Sprite(id[`stair_new_0${i + 1}_railing.png`]);
		const stairNewCarpet = new Sprite(id[`stair_new_0${i + 1}_carpet.png`]);
		const btnOk = new Sprite(id["btn_ok.png"]);

		// stairMenu.anchor.set(0.5, 0.5);
		setPosition(stairMenu, 25, 25);
		stairMenu.zIndex = 3;
		stairMenu.name = `stair_menu_0${i + 1}`;

		let stairNewArr = [];

		stairNewArr.push(stairNew, stairNewRailing, stairNewCarpet);

		stairNewArr.forEach((item, index) => {
			item.anchor.set(1);
			item.y = height - 100;
			item.x = width;
			item.alpha = 0;
			item.zIndex = 5 + index;
			item.name = `stairNewChild_${index}`;
		});

		stairNewArr.name = `stair_new_0${i + 1}`;

		menuItem.interactive = true;
		menuItem.buttonMode = true;
		menuItem.zIndex = 10;
		menuItem.y = -150;

		iconMenuActive.alpha = 0;
		iconMenuActive.zIndex = 2;
		iconMenuActive.name = "iconMenuActive";

		btnOk.anchor.set(0.5);
		btnOk.x = btnOk.width / 2;
		btnOk.y = 120 + btnOk.height / 2;
		btnOk.scale.set(0);
		btnOk.interactive = true;
		btnOk.buttonMode = true;
		btnOk.name = "btnOk";

		function menuItemClick(e) {
			if (e.target !== btnOk) {
				menuItems.forEach((item, index) => {
					let btnOk = item.getChildByName("btnOk");

					item.buttonMode = true;

					item.getChildByName("iconMenuActive").alpha = 0;
					appContainer.getChildByName("stairOld").alpha = 0;
					btnOk.interactive = true;
					gsap.to(btnOk.scale, {
						x: 0,
						y: 0,
						duration: 0.1,
					});
				});

				let targetBtnOk = e.target.getChildByName("btnOk");

				e.target.buttonMode = false;
				e.target.getChildByName("iconMenuActive").alpha = 1;
				gsap.to(targetBtnOk.scale, {
					x: 1,
					y: 1,
					duration: 1,
					ease: Elastic.easeOut,
				});
				targetBtnOk.interactive = true;
				stairs.forEach((stair) => {
					stair.forEach((item, index) => {
						item.alpha = 0;
						item.y = -50;
					});
				});
				stairs[menuItems.indexOf(e.target)].forEach((item, index) => {
					console.log(item);
					setTimeout(() => {
						gsap.to(item, {
							y: height - 17,
							alpha: 1,
							duration: 0.5,
						});
					}, 300 * index);
				});
			} else if (e.target === btnOk) {
				menuItems.forEach((item, index) => {
					(async () => {
						await new Promise((resolve) => {
							setTimeout(() => {
								resolve(
									gsap.to(item, {
										y: 100,
										alpha: 0,
										duration: 0.4,
									})
								);
							}, index * 50);
						});
						appContainer.removeChild(item);
						console.log("item is removed");
					})();

					overlay.alpha = 0.6;
					gsap.to(finalPopup.scale, {
						x: 1,
						y: 1,
						ease: Bounce.easeOut,
					});
				});
			}
		}

		clickAndTouch(menuItem, menuItemClick);

		menuItem.addChild(iconMenu, iconMenuActive, stairMenu, btnOk);
		appContainer.addChild(menuItem, stairNew, stairNewRailing, stairNewCarpet);
		menuItems.push(menuItem);
		stairs.push(stairNewArr);
	}

	stairOld.anchor.set(1);
	stairOld.name = "stairOld";

	iconHammer.interactive = true;
	iconHammer.buttonMode = true;
	iconHammer.scale = 0;
	iconHammer.anchor.set(0.5);

	setTimeout(() => {
		gsap.to(iconHammer.scale, {
			x: 1,
			y: 1,
			duration: 0.5,
			ease: Back.easeOut,
		});
	}, 2000);

	plantBasket.anchor.set(1);
	plantBasket.scale.set(1.07);

	btnContinue.anchor.set(0.5);
	gsap.to(btnContinue.scale, {
		x: 1.05,
		y: 1.05,
		duration: 0.8,
		repeat: -1,
		yoyo: true,
	});
	btnContinue.zIndex = 60;

	menuItems[0].x = 841;
	menuItems[1].x = 971;
	menuItems[2].x = 1099;

	function iconHammerClick() {
		iconHammer.scale.set(0);
		menuItems.forEach((menuItem, index) => {
			setTimeout(() => {
				gsap.to(menuItem, {
					y: 5,
					alpha: 1,
					duration: 0.7,
					ease: Back.easeOut,
				});
			}, index * 100);
		});
		appContainer.removeChild(iconHammer);
	}

	clickAndTouch(iconHammer, iconHammerClick);

	overlay.beginFill(0x000000);
	overlay.drawRect(0, 0, width, height);
	overlay.alpha = 0;
	overlay.zIndex = 50;

	finalPopup.anchor.set(0.5);
	finalPopup.scale.set(0);
	finalPopup.zIndex = 60;

	appContainer.sortChildren();
}
