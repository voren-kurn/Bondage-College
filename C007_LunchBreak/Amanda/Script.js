var C007_LunchBreak_Amanda_CurrentStage = 0;
var C007_LunchBreak_Amanda_NoOption = false; // NoOption means that there's no options to go eat with her
var C007_LunchBreak_Amanda_MatchCount = 0; // At 4 or more, there's a good match
var C007_LunchBreak_Amanda_TickleDone = false;
var C007_LunchBreak_Amanda_MasturbateCount = 0;
var C007_LunchBreak_Amanda_OrgasmDone = false;
var C007_LunchBreak_Amanda_CropDone = false;
var C007_LunchBreak_Amanda_IsRoped = false;
var C007_LunchBreak_Amanda_IsGagged = false;
var C007_LunchBreak_Amanda_MakeLoveReady = true;
var C007_LunchBreak_Amanda_TeethClenchDone = false;
var C007_LunchBreak_Amanda_IntroText = "";
var C007_LunchBreak_Amanda_LeaveIcon = "";

// Calculates the screen parameters
function C007_LunchBreak_Amanda_CalcParams() {

	// Check if there's no options to go eat
	C007_LunchBreak_Amanda_NoOption = ((ActorGetValue(ActorLove) < 5) && (ActorGetValue(ActorSubmission) < 5) && ((ActorGetValue(ActorLove) < 1) || (ActorGetValue(ActorSubmission) > -3)));

	// No special images by default
	OveridenIntroImage = "";
	
	// Between 100 and 200, the image evolves with the number of matches
	if ((C007_LunchBreak_Amanda_CurrentStage >= 100) && (C007_LunchBreak_Amanda_CurrentStage < 200)) {
		var Img = "0";
		if ((C007_LunchBreak_Amanda_MatchCount == 2) || (C007_LunchBreak_Amanda_MatchCount == 3)) Img = "1";
		if (C007_LunchBreak_Amanda_MatchCount >= 4) Img = "2";
		OveridenIntroImage = "AmandaPlayerLunch" + Img + ".jpg";
	}

	// At 330, the player can dominate Amanda with many restrains, the image changes accordingly
	if (C007_LunchBreak_Amanda_CurrentStage == 330) {
		var Img = "";
		if (ActorHasInventory("Rope")) Img = Img + "Rope";
		if (ActorHasInventory("Cuffs")) Img = Img + "Cuffs";
		if (ActorHasInventory("Ballgag")) Img = Img + "Ballgag";
		if (ActorHasInventory("TapeGag")) Img = Img + "TapeGag";
		OveridenIntroImage = "AmandaPlayerIsDommeTouch" + Img + ".jpg";
	}

}

// Chapter 7 - Amanda Load
function C007_LunchBreak_Amanda_Load() {

	// Load the scene parameters
	ActorLoad("Amanda", "ActorSelect");
	LoadInteractions();
	C007_LunchBreak_Amanda_CalcParams();
	
	// If Amanda doesn't like the player and isn't subbie enough, she leaves and don't talk
	if ((ActorGetValue(ActorLove) <= -3) && (ActorGetValue(ActorSubmission) <= 2)) {
		C007_LunchBreak_Amanda_CurrentStage = 5;
		C007_LunchBreak_ActorSelect_AmandaAvail = false;
	}

	// If we must put the previous text back
	if ((C007_LunchBreak_Amanda_IntroText != "") && (C007_LunchBreak_Amanda_CurrentStage > 0)) {
		OveridenIntroText = C007_LunchBreak_Amanda_IntroText;
		LeaveIcon = C007_LunchBreak_Amanda_LeaveIcon;
	}

}

// Chapter 7 - Amanda Run
function C007_LunchBreak_Amanda_Run() {
	BuildInteraction(C007_LunchBreak_Amanda_CurrentStage);
}

// Chapter 7 - Amanda Click
function C007_LunchBreak_Amanda_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C007_LunchBreak_Amanda_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C007_LunchBreak_Amanda_IntroText = OveridenIntroText;
		C007_LunchBreak_Amanda_LeaveIcon = LeaveIcon;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
	
	// When the user wants to use the rope on Amanda - Time and item are consumed
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Rope") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		C007_LunchBreak_Amanda_CurrentStage = 330;
		OveridenIntroText = "(You circle the rope around her body, making|her moan a little louder with each knots.)";
		ActorAddInventory("Rope");
		PlayerRemoveInventory("Rope", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Amanda_IsRoped = true;
	}

	// When the user wants to use cuffs on Amanda - Time and item are consumed
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Cuffs") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		C007_LunchBreak_Amanda_CurrentStage = 330;
		OveridenIntroText = "(You pin her hands behind her back and|cuff them, she shivers with each 'click'.)";
		ActorAddInventory("Cuffs");
		PlayerRemoveInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the ballgag on Amanda - Time and item are consumed
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Ballgag") && !ActorHasInventory("Ballgag")) {
		C007_LunchBreak_Amanda_CurrentStage = 330;
		OveridenIntroText = "(She shakes her head no but you push|the ballgag in and buckle it tight.)";
		ActorRemoveInventory("TapeGag");
		ActorAddInventory("Ballgag");
		PlayerRemoveInventory("Ballgag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Amanda_IsGagged = true;
	}

	// When the user wants to use the tape gag on Amanda - Time and item are consumed
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "TapeGag") && !ActorHasInventory("TapeGag")) {
		C007_LunchBreak_Amanda_CurrentStage = 330;
		OveridenIntroText = "(She shakes her head no|but you tape her mouth shut.)";
		C007_LunchBreak_Amanda_Ungag();
		ActorAddInventory("TapeGag");
		PlayerRemoveInventory("TapeGag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Amanda_IsGagged = true;
	}

	// When the user wants to use the crop on Amanda
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Crop")) {
		OveridenIntroText = "(You hit her pretty hard with the crop.|She cries and doesn't seem to enjoy it.)";
		if (!C007_LunchBreak_Amanda_CropDone) {
			C007_LunchBreak_Amanda_CropDone = true;
			ActorChangeAttitude(-1, 0);
		}
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the egg on Amanda (Amanda isn't affected by the egg but can still have one)
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg")) {
		OveridenIntroText = "(She squeezes her legs but you're able|to push it hard enough to slide it in.)";
		ActorChangeAttitude(-1, 1);
		ActorAddInventory("VibratingEgg");
		PlayerRemoveInventory("VibratingEgg", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the cuffs keys
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "CuffsKey") && ActorHasInventory("Cuffs")) {
		OveridenIntroText = "(You use the key and release her.|She moans and quickly grabs the fence.)";
		ActorRemoveInventory("Cuffs");
		PlayerAddInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the collar (+20 submission is required, probably impossible at that point)
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Collar") && !ActorHasInventory("Collar")) {
		if (ActorGetValue(ActorSubmission) >= 20) {
			C007_LunchBreak_Amanda_CurrentStage = 330;
			OveridenIntroText = "(Amanda bows her head while you|strap the collar around her neck.)";
			ActorAddInventory("Collar");
			PlayerRemoveInventory("Collar", 1);
			CurrentTime = CurrentTime + 60000;
		} else {
			OveridenIntroText = "(You need +20 submission|or better to collar Amanda.)";
		}
	}

	// When the user wants to use a bondage item in the love scenes
	if ((C007_LunchBreak_Amanda_CurrentStage >= 200) && (C007_LunchBreak_Amanda_CurrentStage < 300) && ((ClickInv == "Collar") || (ClickInv == "Cuffs") || (ClickInv == "VibratingEgg") || (ClickInv == "Crop") || (ClickInv == "TapeGag") || (ClickInv == "Ballgag") || (ClickInv == "Cuffs") || (ClickInv == "Rope")))
		OveridenIntroText = "(She pushes your hand and the item away.)|The mood isn't right for that sweetheart.";

	// When the user wants to use a bondage item when subbie
	if ((C007_LunchBreak_Amanda_CurrentStage >= 400) && (C007_LunchBreak_Amanda_CurrentStage < 440) && ((ClickInv == "Collar") || (ClickInv == "Cuffs") || (ClickInv == "VibratingEgg") || (ClickInv == "Crop") || (ClickInv == "TapeGag") || (ClickInv == "Ballgag") || (ClickInv == "Cuffs") || (ClickInv == "Rope")))
		OveridenIntroText = "(She pushes your hand and the item away.)|I already have everything I need subbie girl.";
	
	// Recalculates the scene parameters
	C007_LunchBreak_Amanda_CalcParams();
	
}

// Chapter 7 - Amanda No Leave
function C007_LunchBreak_Amanda_NoLeave() {
	LeaveIcon = "";
}

// Chapter 7 - Amanda Start Lunch
function C007_LunchBreak_Amanda_StartLunch() {	
	CurrentTime = CurrentTime + 480000;
	LeaveIcon = "";
}

// Chapter 7 - Amanda Eat Lunch (adds 20 minutes)
function C007_LunchBreak_Amanda_EatLunch() {	
	CurrentTime = CurrentTime + 1800000;
}

// Chapter 7 - Amanda End Lunch
function C007_LunchBreak_Amanda_EndLunch() {
	C007_LunchBreak_ActorSelect_AmandaAvail = false;
}

// Chapter 7 - Amanda Good Match
function C007_LunchBreak_Amanda_GoodMatch() {
	C007_LunchBreak_Amanda_MatchCount++;
	C007_LunchBreak_Amanda_CalcParams();
}

// Chapter 7 - Amanda Bad Match
function C007_LunchBreak_Amanda_BadMatch() {
	C007_LunchBreak_Amanda_MatchCount--;
	C007_LunchBreak_Amanda_CalcParams();
}

// Chapter 7 - Amanda Test Match - if the match is 4 or better, we go to a bonus part
function C007_LunchBreak_Amanda_TestMatch() {
	C007_LunchBreak_Amanda_CurrentStage = -1; // No mode
	if ((ActorGetValue(ActorLove) >= 5) && (C007_LunchBreak_Amanda_MatchCount >= 4)) C007_LunchBreak_Amanda_CurrentStage = 200; // Lovers mode
	if ((ActorGetValue(ActorSubmission) >= 5) && (C007_LunchBreak_Amanda_MatchCount >= 4)) C007_LunchBreak_Amanda_CurrentStage = 300; // Player is Domme mode
	if (ActorGetValue(ActorSubmission) >= 10) C007_LunchBreak_Amanda_CurrentStage = 300; // Player is Domme mode (10 is so high that we don't check for a match)
	if ((ActorGetValue(ActorLove) >= 1) && (ActorGetValue(ActorSubmission) <= -3) && (C007_LunchBreak_Amanda_MatchCount >= 4)) C007_LunchBreak_Amanda_CurrentStage = 400; // Player is subbie mode
	if (C007_LunchBreak_Amanda_CurrentStage == -1) SetScene(CurrentChapter, "Outro"); // No mode, we end the chapter
	else C007_LunchBreak_ActorSelect_BonusDone = true; // With a mode, we flag the bonus scene
	OveridenIntroImage = "";
}

// Chapter 7 - Amanda Tickle
function C007_LunchBreak_Amanda_Tickle() {
	if (!C007_LunchBreak_Amanda_TickleDone) {
		C007_LunchBreak_Amanda_TickleDone = true;
		ActorChangeAttitude(1, 0);
	}
}

// Chapter 7 - Amanda Masturbate
function C007_LunchBreak_Amanda_Masturbate() {
	
	// The count goes up, after 3 times she can have an orgasm but only if she's bound and gagged
	C007_LunchBreak_Amanda_MasturbateCount++;
	if ((ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) && (ActorHasInventory("Ballgag") || ActorHasInventory("TapeGag"))) {
		if ((C007_LunchBreak_Amanda_MasturbateCount >= 3) && !C007_LunchBreak_Amanda_OrgasmDone) {
			OveridenIntroText = "(She can't control herself anymore and|gets a quiet orgasm right in the school yard.)";
			ActorAddOrgasm();
			ActorChangeAttitude(1, 1);
			C007_LunchBreak_Amanda_OrgasmDone = true;
		} else {
			OveridenIntroText = "(She moans loudly while you masturbate her.|Trembling without control at your loving touch.)";
		}
	}
	
}

// Chapter 7 - Amanda Untie
function C007_LunchBreak_Amanda_Untie() {
	ActorRemoveInventory("Rope");
	PlayerAddInventory("Rope", 1);
	C007_LunchBreak_Amanda_IsRoped = false;
}

// Chapter 7 - Amanda Ungag
function C007_LunchBreak_Amanda_Ungag() {
	ActorRemoveInventory("TapeGag");
	if (ActorHasInventory("Ballgag")) {
		ActorRemoveInventory("Ballgag");
		PlayerAddInventory("Ballgag", 1);
	}
	C007_LunchBreak_Amanda_IsGagged = false;
}

// Chapter 7 - Amanda Test Make Love (Amanda will only make love if +8 or more)
function C007_LunchBreak_Amanda_TestMakeLove() {
	if (ActorGetValue(ActorLove) >= 8) {
		OveridenIntroText = "(You spontaneously raise each other|skirt and start to masturbate each other.)";
		C007_LunchBreak_Amanda_CurrentStage = 240;
	} else {
		C007_LunchBreak_Amanda_MakeLoveReady = false;
		ActorChangeAttitude(-1, 0);
	}
}

// Chapter 7 - Amanda Love Masturbate (After 3 times, the player cums)
function C007_LunchBreak_Amanda_LoveMasturbate() {
	C007_LunchBreak_Amanda_MasturbateCount++;
	if (C007_LunchBreak_Amanda_MasturbateCount >= 3) {
		OveridenIntroText = "(Amanda's touch gives you a wonderful orgasm.|Seeing your pleasure, she stops and pull back.)";
		ActorAddOrgasm();
		ActorChangeAttitude(1, 0);
		C007_LunchBreak_Amanda_CurrentStage = 250;
	}
}

// Chapter 7 - Amanda Subbie Masturbate (After 3 times, the player cums)
function C007_LunchBreak_Amanda_SubbieMasturbate() {
	C007_LunchBreak_Amanda_MasturbateCount++;
	if (C007_LunchBreak_Amanda_MasturbateCount >= 3) {
		OveridenIntroText = "(Amanda's touch gives you a wonderful orgasm.|Seeing your pleasure, she stops masturbating you.)";
		ActorAddOrgasm();
		ActorChangeAttitude(1, 0);
		C007_LunchBreak_Amanda_CurrentStage = 470;
	}
}

// Chapter 7 - Amanda Teeth Clench (Amanda doesn't like it)
function C007_LunchBreak_Amanda_ClenchTeeth() {
	if (!C007_LunchBreak_Amanda_TeethClenchDone) {
		ActorChangeAttitude(-1, 1);
		C007_LunchBreak_Amanda_TeethClenchDone = true;
	}
}

// Chapter 7 - Amanda - Player Subbie Strip
function C007_LunchBreak_Amanda_SubbieStrip() {
	PlayerClothes("Underwear");
}

// Chapter 7 - Amanda - Player Subbie Rope
function C007_LunchBreak_Amanda_SubbieRope() {
	PlayerLockInventory("Rope");
}

// Chapter 7 - Amanda - Player Subbie Gag
function C007_LunchBreak_Amanda_SubbieGag() {
	PlayerLockInventory("Ballgag");
}

// Chapter 7 - Amanda - Player Subbie Ungag
function C007_LunchBreak_Amanda_SubbieUngag() {
	PlayerUnlockInventory("Ballgag");
}

// Chapter 7 - Amanda - Player Release
function C007_LunchBreak_Amanda_SubbieRelease() {
	PlayerUnlockAllInventory();
	PlayerClothes("Clothed");
}

// Chapter 7 - Amanda End Bonus Scene
function C007_LunchBreak_Amanda_EndBonus() {
	SetScene(CurrentChapter, "Outro");
}
