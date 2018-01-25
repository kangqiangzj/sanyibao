var m1 = angular.module("sanyibao",["ionic"]);
	//初始化配置路由
	m1.config(["$stateProvider",function($stateProvider){
		$stateProvider.state("shouye",{
			url:"/shouye",
			templateUrl:"html/shouye.html"			
		}).state("xiangmu",{
			url:"/xiangmu",
			templateUrl:"html/xiangmu.html",
			controller:"xiangmu"
		}).state("xiangmu.zhitou",{
			url:"/xiangmu.zhitou",
			templateUrl:"html/zhitou.html"
		}).state("xiangmu.zhaiquan",{
			url:"/xiangmu.zhaiquan",
			templateUrl:"html/zhaiquan.html"
		}).state("detail1",{
			url:"/detail1/:id",
			templateUrl:"html/detail1.html",
			controller:"detail1"
		}).state("login",{
			url:"/login",
			templateUrl:"html/login.html",
			controller:"login"
		}).state("register",{
			url:"/register",
			templateUrl:"html/register.html",
			controller:"register"
		}).state("wode",{
			url:'/wode',
			templateUrl:"html/wode.html",
			controller:"wode",
			cache:false
			
		}).state("faxian",{
			url:'/faxian',
			templateUrl:"html/faxian.html",
			controller:"faxian"
		}).state("faxian_detail",{
			url:"/faxian_detail/:id",
			templateUrl:"html/faxian_detail.html",
			controller:"faxian_detail"
		})
	}])
			//初始化控制器
	m1.controller("main",["$scope","$rootScope","$state","$http",function($scope,$rootScope,$state,$http){
		$state.go("shouye");
		$http({
			method:"get",
			url:"mock/detail.json",
		}).success(function(data){
			console.log(data.datas);
			$scope.datas = data.datas
		});
		$scope.doRefresh = function(){
			$http({
			method:"get",
			url:"mock/detail.json",
		}).success(function(data){
			console.log(data.datas);
			$scope.datas = data.datas
		});
			$scope.$broadcast('scroll.refreshComplete');
		};
			
	}])
	m1.controller("xiangmu",["$scope","$stateParams","$http","$state",function($scope,$stateParams,$http,$state){
//		$scope.loadMore = function(){
			$state.go("xiangmu.zhitou")
			$scope.to_zhaiquan = function(){
				$state.go("xiangmu.zhaiquan")
			}
			$scope.to_zhitou = function(){
				$state.go("xiangmu.zhitou")
			}
			$http({
				method:"get",
				url:"mock/detail.json",
			}).success(function(data){
				console.log(data.datas);
				$scope.datas = data.datas
//				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
			
//		}
	}])
	
	m1.controller("detail1",["$scope","$stateParams","$http",function($scope,$stateParams,$http){
		console.log($stateParams.id)
		$http({
			method:"get",
			url:"mock/detail.json",
		}).success(function(data){
			var datas = data.datas
			for(var i = 0;i < datas.length;i++){
				if(datas[i].id == $stateParams.id){
					$scope.data = datas[i] 					
				}	
			}
			console.log($scope.data)
		});
		
	}])
	m1.controller("login",["$scope","$stateParams","$state","$http",function($scope,$stateParams,$state,$http){
		$scope.data = {};
		$scope._login = function(){
//			console.log($scope.data.loginuser)
			var loginuser = $scope.data.loginuser,
				loginpwd = $scope.data.loginpwd;
			if(loginuser == ""){
				alert("请输入用户名")
			}else if(loginpwd == ""){
				alert("请输入密码")
			}else{
				$http({
					method:"post",
					url:"http://stuapi.ysd3g.com/api/login",
					params:{
						un:loginuser,
						pwd:loginpwd,
						token:"aa4ccde8-3b85-476d-b68b-7f78f72e74d1"
					}
				}).success(function(data){
					alert("登录成功")
//					存入
					localStorage.setItem("user",loginuser);
					
					$state.go("wode")
				})
			}
		}
		
	}])
	m1.controller("register",["$scope","$stateParams","$http","$state",function($scope,$stateParams,$http,$state){
		$scope.data={}
		$scope._register = function(){
			var username = $scope.data.reguser,
				username_len = username.length;
			var password = $scope.data.regpsw;
			var repassword = $scope.data.regrepsw;
			console.log(username,password,repassword);
			user_first = username.substr(0,1);

			//注册用户信息
			var user_reg = /^[a-z]\w{3,}$/i,
				usercheck = false,
				pwdcheck = false,
				conpwdcheck = false;
				if(!user_reg.test(username)){
		//			$(".username").css("color","red");
					if(!((user_first>="a"&&user_first<="w")||(user_first>="A"&&user_first<="W"))){
						alert("提示：用户名请用 英文字母开头");
					}else if(username_len<4){
						alert("提示：用户名至少四个字符")
					}
				}else{
					usercheck = true;
				}
				//确认密码两次是否驶入一致
				if(password == ""&&usercheck){
					alert("请输入密码")
				}else if(password == repassword){
					conpwdcheck = true;
				}else if(password != repassword){
					alert("两次输入密码不一致！");
				}
				//提交信息
				if(usercheck&&conpwdcheck){
					$http({
						method:"post",
						url:"http://stuapi.ysd3g.com/api/CreateUser",
						params:{
							loginName:username,pwd:password,token:'aa4ccde8-3b85-476d-b68b-7f78f72e74d1'
						}
					}).success(function(data){
						var data = angular.fromJson(data)
							if(data.success){
								alert("注册成功")
								$state.go("login");
							}else{
								alert("注册失败")
								
							}
						console.log(data)
					})
				}
				}
	}])
	m1.controller("wode",["$scope","$window",function($scope,$window){
//		
		var user = localStorage.getItem("user");
		$scope.isShow2 = false;
		$scope.isShow1 = true;
		
		console.log(user);
		if(user){
			$scope.isShow1 = false;
			$scope.isShow2 = true;
			$scope.isShow3 = true;
			$scope.username = user;
			
			$scope.removelogin = function(){
				localStorage.clear()
				$scope.isShow3 = false;
				$window.location.reload();
			}
		}		
//			$window.location.reload();	
	}])
	
	//发现

	m1.controller("faxian",["$scope","$http",function($scope,$http){
		$scope.dianzan = function(){
			
		}
		$http({
			method:"get",
			url:"mock/faxian.json"			
		}).success(function(data){			
			$scope.datas = data.datas;
//			console.log(datas)
		})
	}])
	m1.controller("faxian_detail",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
		var id = $stateParams.id
		console.log(id)
		$http({
			method:"get",
			url:"mock/faxian.json"			
		}).success(function(data){			
//			$scope.datas = data.datas;
			
			for(var i = 0;i<data.datas.length;i++){
				if(data.datas[i].id == id){
					$scope.datas = data.datas[i];
					console.log($scope.datas)
				}
			}
		})
	}])