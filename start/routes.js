"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use("Route");

Route.post("/user", "Users/UserController.store").validator(["CreateUser"]);

Route.post("/session", "Users/SessionController.store").validator([
  "SessionUser",
]);

Route.post(
  "/password/forgot",
  "Users/Password/ForgotPasswordController.store"
).validator(["ForgotPassword"]);

Route.patch(
  "/password/recover",
  "Users/Password/RecoverPasswordController.update"
).validator(["RecoverPassword"]);

Route.get("/static/:file", "StaticController.show");

Route.group(() => {
  Route.put("user", "Users/UserController.update").validator(["UpdateUser"]);

  Route.patch("user/avatar", "Users/AvatarController.update");

  Route.post(
    "appointment",
    "Appointments/AppointmentController.store"
  ).validator(["CreateAppointment"]);

  Route.get("appointment/me", "Appointments/MyAppointmentsController.index");

  Route.get(
    "appointment/provider/me",
    "Appointments/Providers/MyProviderAppointmentsController.index"
  );

  Route.get(
    "appointment/provider",
    "Appointments/Providers/ProviderController.index"
  );

  Route.get(
    "appointment/availability/hour",
    "Appointments/Providers/ProviderHourAvailabilityOnDayController.index"
  );

  Route.get(
    "appointment/availability/day",
    "Appointments/Providers/AvailabilityDaysOnMonthController.index"
  );
}).middleware(["auth"]);
