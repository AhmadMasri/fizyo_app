import {
    Get,
    Post,
    Route,
    SuccessResponse,
    Body,
    Response,
    Example,
    Delete,
    Path,
    Put,
  } from "tsoa";
import { INotifications } from "../types/interfaces";
import { Model } from "mongoose";

const NotificationModel: Model<INotifications> = require("../models/NotificationsModel");

@Route("notifications")
export default class NotificationController {
  /**
   * Get List of All Notifications
   */
  @Get("/")
  public async getNotifications(): Promise<INotifications[]> {
    return await NotificationModel.find();
  }

   /**
   * Get a Notification details
   * @example NotificationId "6300e18d3bbd975cf6459994"
   */
    @Response(404, "the requested notification in not found")
    @Get("{notificationId}")
    public async getNotification(notificationId: string): Promise<INotifications | null> {
      return await NotificationModel.findById(notificationId);
    }

    /**
   * Delete a notification
   * @example notificationId "6300e18d3bbd975cf6459994"
   */
  @Response(404, "the requested notification in not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{notificationId}")
  public async deleteNotification(notificationId: string) {
    return await NotificationModel.findByIdAndDelete(notificationId);
  }

   /**
   * Create a notification
   */
    @Response(422, "Validation Failed")
    @SuccessResponse("200", "Created")
    // @Example<INotifications>({
    //     referenceType:"",
    //     referenceID:"",
    //     statues:"",
    //     title:"",
    //     details:"",
    //     sentDate:"",
    //     receivedDate:"",
    //     openDate:"",
    //     receiverUID:"",
        
    // })
    @Post("create")
    public async createNotification(@Body() notification: INotifications): Promise<INotifications> {
      return new NotificationModel({
        ...notification,
      }).save();
    }

      /**
   * Update a notification
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "updated")
  @Put("update/{notificationId}")
  public async updateNotification(
    @Path() notificationId: string,
    @Body() notification: Partial<INotifications>
  ): Promise<INotifications | null> {
    let notificationDocument = await NotificationModel.findById(notificationId);
    if (notificationDocument != null) {
      notificationDocument.referenceType = notification.referenceType ?? notificationDocument.referenceType;
      notificationDocument.referenceID = notification.referenceID ?? notificationDocument.referenceID;
      notificationDocument.statues = notification.statues ?? notificationDocument.statues;
      notificationDocument.title = notification.title ?? notificationDocument.title;
      notificationDocument.details = notification.details ?? notificationDocument.details;

      notificationDocument.sentDate = notification.sentDate ?? notificationDocument.sentDate;
      notificationDocument.receivedDate = notification.receivedDate ?? notificationDocument.receivedDate;
      notificationDocument.openDate = notification.openDate ?? notificationDocument.openDate;
      notificationDocument.receiverUID = notification.receiverUID ?? notificationDocument.receiverUID;
      return await notificationDocument.save();
    }
    return null;
  }
}