// let ment1 = document.getElementById("ment1");
// let ment2 = document.getElementById("ment2");
// let ment3 = document.getElementById("ment3");

// if(totalPrice > 100000){
//   ment1.className="priceMentClass2";
//   ment2.className="priceMentClass2";
//   ment3.className="priceMentClass2";
// }

function plus(amount, productCode, memberNo){
  if(amount == 10){
    alert("최대 수량은 10개입니다.");
    return;
  } else {
    amount++;
    let param = "amount=" + amount + "&productCode=" + productCode + "&memberNo=" + memberNo;
    $.ajax({
      type: "post",
      data: param,
      url: "updateAmountProc.php",
      success: function(){
        location.reload();
      }
    });
  }
}

function minus(amount, productCode, memberNo){
  if(amount == 1){
    alert("최소 수량은 1개입니다.");
    return;
  } else {
    amount--;
    let param = "amount=" + amount + "&productCode=" + productCode + "&memberNo=" + memberNo;
    $.ajax({
      type: "post",
      data: param,
      url: "updateAmountProc.php",
      success: function(){
        location.reload();
      }
    });
  }
}

$(document).ready(function(){
	$("#checkAll").click(function(){
		if($("#checkAll").prop("checked")){
			$("input[name=checkProduct]").prop("checked", true);
		} else{
			$("input[name=checkProduct]").prop("checked", false);
		}
    priceCal();
	});
	$(".checkboxClass").change(function(){
		if($(".checkboxClass:checked").length == $(".checkboxClass").length){
			$("#checkAll").prop("checked", true);
		} else{
			$("#checkAll").prop("checked", false);
		}
    priceCal();
	});
});
async function priceCal(){
  let price = 0;
  let delPrice = 0;
  let totalPrice = 0;
  let temp = "";

  let object = document.getElementsByName("checkProduct");
  for(i = 0; i < object.length; i++){
    if(object[i].checked){
      let param = "productCode=" + object[i].value + "&memberNo=" + memberNo;
      await $.ajax({
        type: "post",
        data: param,
        url: "calPriceProc.php",
        success: function(result){
          temp = result.split("/");
          temp[0] = +temp[0];
          temp[1] = +temp[1];
          temp[2] = +temp[2];
          price = price + (temp[0] * temp[1]);
          delPrice = delPrice + temp[2];
          totalPrice = price + delPrice;
        }
      });
    }
  }
  $('#totalPrice').val(price.toLocaleString());
  $('#totalDelPrice').val(delPrice.toLocaleString());
  $('#allTotalPrice').val(totalPrice.toLocaleString());
}
